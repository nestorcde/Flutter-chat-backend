//{
//     /api/usuarios
//}

const {Router, response} = require('express');
const { getTurnos, registrarTurno, eliminarTurno, verificarTurno } = require('../controller/turno');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();




router.get('/',validarJWT, getTurnos);
router.post('/nuevo',validarJWT,registrarTurno);
router.delete('/',validarJWT,eliminarTurno);
router.post('/verificar',validarJWT,verificarTurno);








module.exports = router;