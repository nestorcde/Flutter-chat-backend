import { Router } from 'express';
import { getTurnos, registrarTurno, eliminarTurno, verificarTurno } from '../controllers';
import { validarJWT } from '../middlewares';

const router = Router();

router.get('/', validarJWT, getTurnos);
router.post('/nuevo', validarJWT, registrarTurno);
router.delete('/', validarJWT, eliminarTurno);
router.post('/verificar', validarJWT, verificarTurno);

export default router;