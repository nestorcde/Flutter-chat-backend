import { Response } from 'express';
import { Mensaje } from '../models';
import { AuthenticatedRequest, ApiResponse, CreateMessageRequest, IMensaje } from '../types';

export const getMensajes = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const miId = req.uid!;
    const mensajeDe = req.params['de'];

    const mensajes = await Mensaje.find({
      $or: [
        { de: miId, para: mensajeDe }, 
        { de: mensajeDe, para: miId }
      ]
    }).sort({ createdAt: 'desc' });

    const response: ApiResponse = {
      ok: true,
      data: { mensajes }
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador'
    });
  }
};

export const grabarMensaje = async (payload: CreateMessageRequest & { de: string }): Promise<IMensaje | false> => {
  try {
    const mensaje = new Mensaje(payload);
    const msg = await mensaje.save();
    return msg;
  } catch (error) {
    console.log('Error grabando mensaje:', error);
    return false;
  }
};

export const mensajeLeido = async (payload: { uid: string }): Promise<boolean> => {
  try {
    const { uid } = payload;
    const mensaje = await Mensaje.findById(uid);
    
    if (!mensaje) {
      return false;
    }

    mensaje.estado = '1';
    await mensaje.save();
    return true;
  } catch (error) {
    console.log('Error marcando mensaje como leído:', error);
    return false;
  }
};