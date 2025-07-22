import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthenticatedRequest, JwtPayload } from '../types';

export const validarJWT = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  const token = req.header('x-token');

  if (!token) {
    res.status(401).json({
      ok: false,
      msg: 'No hay token en la petición'
    });
    return;
  }

  try {
    const { uid } = jwt.verify(token, process.env['JWT_KEY']!) as JwtPayload;
    req.uid = uid;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      ok: false,
      msg: 'Token inválido'
    });
  }
};

export const comprobarJWT = (token: string = ''): [boolean, string | null] => {
  try {
    const { uid } = jwt.verify(token, process.env['JWT_KEY']!) as JwtPayload;
    return [true, uid];
  } catch (error) {
    return [false, null];
  }
};