const {Router, response} = require('express');
const { check } = require('express-validator');
const { crearUsuario, login, renewToken } = require('../controller/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();




router.post('/new', [
    check('nombre','El nombre es obligatorio').notEmpty(),
    check('email','El email es obligatorio').isEmail(),
    check('password','La contraseña es obligatoria').notEmpty(),
    validarCampos
] , crearUsuario);

router.post('/', [
    check('email','El email es obligatorio').isEmail(),
    check('password','La contraseña es obligatoria').notEmpty(),
    validarCampos
] , login);

router.get('/renew',validarJWT, renewToken);








module.exports = router;