//{
//     /api/usuarios
//}

const {Router, response} = require('express');
const { getUsuarios, verificado, setTutorial } = require('../controller/usuario');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();




router.get('/',validarJWT, getUsuarios);
router.post('/revisar', verificado);
router.post('/tutorial', setTutorial);








module.exports = router;