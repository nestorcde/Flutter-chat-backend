import { Response } from 'express';
import { Usuario } from '../models';
import { AuthenticatedRequest, ApiResponse } from '../types';
import fs from 'fs';
import { promisify } from 'util';

const unlinkAsync = promisify(fs.unlink);

export const updateProfile = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { uid, nombre, telefono }: { uid: string; nombre: string; telefono: string } = req.body;

    const usuario = await Usuario.findById(uid);
    
    if (!usuario) {
      res.status(404).json({
        ok: false,
        msg: 'Usuario no encontrado'
      });
      return;
    }

    usuario.nombre = nombre;
    usuario.telefono = telefono;

    await usuario.save();

    const response: ApiResponse = {
      ok: true,
      data: { usuario }
    };

    res.json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Hable con el Administrador'
    });
  }
};

export const setUsuarioImage = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { uid, random }: { uid: string; random: string } = req.body;
    const miUsuario = await Usuario.findById(uid);

    if (!miUsuario) {
      res.status(404).json({
        ok: false,
        msg: 'Usuario no encontrado'
      });
      return;
    }

    if (req.file) {
      // Delete old profile image if it's not the default
      if (miUsuario.imgProfile !== 'blank-profile-picture.png') {
        try {
          await unlinkAsync(`uploads/${miUsuario.imgProfile}`);
          console.log('Archivo anterior removido');
        } catch (err) {
          console.log('Error removiendo archivo anterior:', err);
        }
      }

      const posicion = req.file.mimetype.indexOf('/');
      const extension = req.file.mimetype.substring(posicion + 1);
      miUsuario.imgProfile = `${uid}${random}.${extension}`;
      
      await miUsuario.save();

      const response: ApiResponse = {
        ok: true,
        data: { usuario: miUsuario }
      };

      res.status(200).json(response);
    } else {
      res.status(400).json({
        ok: false,
        msg: 'No hay archivo de imagen'
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Hable con el Administrador'
    });
  }
};