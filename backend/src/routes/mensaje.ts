import { Router } from 'express';
import { getMensajes } from '../controllers';
import { validarJWT } from '../middlewares';

const router = Router();

router.get('/:de', validarJWT, getMensajes);

export default router;