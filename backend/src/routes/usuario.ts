import { Router } from 'express';
import { getUsuarios, verificado, setTutorial } from '../controllers';
import { validarJWT } from '../middlewares';

const router = Router();

router.get('/', validarJWT, getUsuarios);
router.post('/revisar', verificado);
router.post('/tutorial', setTutorial);

export default router;