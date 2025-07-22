import { Response } from 'express';
import { validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import { Usuario } from '../models';
import { generarJWT } from '../helpers/jwt';
import { AuthenticatedRequest, CreateUserRequest, LoginRequest, ApiResponse } from '../types';

export const crearUsuario = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({
      ok: false,
      msg: 'Errores de validación',
      errors: errors.array()
    });
    return;
  }

  const { email, password }: CreateUserRequest = req.body;

  try {
    const existeEmail = await Usuario.findOne({ email });

    if (existeEmail) {
      res.status(400).json({
        ok: false,
        msg: 'El email ya está registrado'
      });
      return;
    }

    const usuario = new Usuario(req.body as CreateUserRequest);

    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    await usuario.save();

    const token = await generarJWT(usuario.id);

    const response: ApiResponse = {
      ok: true,
      data: {
        usuario,
        token
      }
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

export const login = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({
      ok: false,
      msg: 'Errores de validación',
      errors: errors.array()
    });
    return;
  }

  const { email, password }: LoginRequest = req.body;

  try {
    const usuarioDB = await Usuario.findOne({ email });
    
    if (!usuarioDB) {
      res.status(404).json({
        ok: false,
        msg: 'Email no registrado'
      });
      return;
    }

    const validarPassword = bcrypt.compareSync(password, usuarioDB.password);
    
    if (!validarPassword) {
      res.status(404).json({
        ok: false,
        msg: 'Contraseña inválida'
      });
      return;
    }

    const token = await generarJWT(usuarioDB.id);

    const response: ApiResponse = {
      ok: true,
      data: {
        usuario: usuarioDB,
        token
      }
    };

    res.json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador'
    });
  }
};

export const renewToken = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const uid = req.uid!;
    const token = await generarJWT(uid);
    const usuario = await Usuario.findById(uid);

    const response: ApiResponse = {
      ok: true,
      data: {
        usuario,
        token
      }
    };

    res.json(response);
  } catch (error) {
    res.status(401).json({
      ok: false,
      msg: 'Hable con el administrador'
    });
  }
};