import jwt from 'jsonwebtoken';
import { JwtPayload } from '../types';

export const generarJWT = (uid: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const payload = { uid };

    jwt.sign(payload, process.env['JWT_KEY']!, {
      expiresIn: '24h'
    }, (err, token) => {
      if (err) {
        console.log(err);
        reject('No se pudo generar el JWT');
      } else {
        resolve(token!);
      }
    });
  });
};

export const verificarJWT = (token: string): [boolean, string | null] => {
  try {
    const { uid } = jwt.verify(token, process.env['JWT_KEY']!) as JwtPayload;
    return [true, uid];
  } catch (error) {
    return [false, null];
  }
};