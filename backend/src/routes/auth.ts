import { Router } from 'express';
import { body } from 'express-validator';
import { crearUsuario, login, renewToken } from '../controllers';
import { validarCampos, validarJWT } from '../middlewares';

const router = Router();

router.post('/new', [
  body('nombre', 'El nombre es obligatorio').notEmpty(),
  body('telefono', 'El teléfono es obligatorio').notEmpty(),
  body('telefono', 'El teléfono debe ser válido').isMobilePhone('es-PY'),
  body('email', 'El email es obligatorio').isEmail(),
  body('password', 'La contraseña es obligatoria').notEmpty(),
  validarCampos
], crearUsuario);

router.post('/', [
  body('email', 'El email es obligatorio').isEmail(),
  body('password', 'La contraseña es obligatoria').notEmpty(),
  validarCampos
], login);

router.get('/renew', validarJWT, renewToken);

export default router;