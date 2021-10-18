//{
//     /api/usuarios
//}

const {Router, response} = require('express');
const { getMensajes } = require('../controller/mensaje');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();




router.get('/:de',validarJWT, getMensajes);








module.exports = router;