//{
//     /api/usuarios
//}

const {Router, response} = require('express');
const { getTurnos, registrarTurno, eliminarTurno } = require('../controller/turno');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();




router.get('/',validarJWT, getTurnos);
router.post('/nuevo',validarJWT,registrarTurno);
router.delete('/',validarJWT,eliminarTurno);








module.exports = router;