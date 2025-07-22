import { Router } from 'express';
import { body } from 'express-validator';
import { updateProfile, setUsuarioImage } from '../controllers/profile';
import { validarCampos, validarJWT } from '../middlewares';
import { upload } from '../config/multer';

const router = Router();

router.post('/', [
  body('nombre', 'El nombre es obligatorio').notEmpty(),
  body('telefono', 'El teléfono es obligatorio').notEmpty(),
  body('telefono', 'El teléfono debe ser válido').isMobilePhone('es-PY'),
  validarCampos,
  validarJWT
], updateProfile);

router.post('/imageProfile', 
  upload.single('imgProfile'), 
  setUsuarioImage
);

export default router;