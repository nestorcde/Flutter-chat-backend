import { Response } from 'express';
import { Usuario, Mensaje } from '../models';
import { AuthenticatedRequest, ApiResponse, IUsuario } from '../types';

export const getUsuarios = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const desde = Number(req.query['desde']) || 0;
    const miUsuario = await Usuario.findById(req.uid!);

    if (!miUsuario) {
      res.status(404).json({
        ok: false,
        msg: 'Usuario no encontrado'
      });
      return;
    }

    let usuarios1: IUsuario[] = [];

    if (miUsuario.admin) {
      usuarios1 = await Usuario
        .find({ $and: [{ _id: { $ne: req.uid } }, { admin: false }] })
        .sort('-online')
        .skip(desde)
        .limit(20);
    } else {
      usuarios1 = await Usuario
        .find({ $and: [{ _id: { $ne: req.uid } }, { admin: true }] })
        .sort('-online')
        .skip(desde)
        .limit(20);
    }

    const usuarios: IUsuario[] = [];

    for (const usuario of usuarios1) {
      try {
        const noLeidos = await Mensaje.find({ 
          $and: [{ estado: '0', de: usuario._id, para: req.uid }] 
        }).countDocuments();
        
        usuario.noLeidos = noLeidos;
        usuarios.push(usuario);
      } catch (error) {
        console.log('Error:', error);
      }
    }

    const response: ApiResponse = {
      ok: true,
      data: { usuarios }
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador'
    });
  }
};

export const usuarioConectado = async (uid: string): Promise<IUsuario | null> => {
  try {
    const usuario = await Usuario.findById(uid);
    if (usuario) {
      usuario.online = true;
      await usuario.save();
    }
    return usuario;
  } catch (error) {
    console.log('Error conectando usuario:', error);
    return null;
  }
};

export const usuarioDesconectado = async (uid: string): Promise<IUsuario | null> => {
  try {
    const usuario = await Usuario.findById(uid);
    if (usuario) {
      usuario.online = false;
      await usuario.save();
    }
    return usuario;
  } catch (error) {
    console.log('Error desconectando usuario:', error);
    return null;
  }
};

export const verificado = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { uid, valor }: { uid: string; valor: boolean } = req.body;

    const usuario = await Usuario.findById(uid);
    if (!usuario) {
      res.status(404).json({
        ok: false,
        msg: 'Usuario no encontrado'
      });
      return;
    }

    usuario.revisado = valor;
    await usuario.save();

    const response: ApiResponse = {
      ok: true,
      data: { usuario }
    };

    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: 'Hable con el administrador'
    });
  }
};

export const setTutorial = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { uid }: { uid: string } = req.body;
    
    const usuario = await Usuario.findById(uid);
    if (!usuario) {
      res.status(404).json({
        ok: false,
        msg: 'Usuario no encontrado'
      });
      return;
    }

    usuario.tutorial = true;
    await usuario.save();

    const response: ApiResponse = {
      ok: true,
      data: { usuario }
    };

    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: 'Hable con el administrador'
    });
  }
};