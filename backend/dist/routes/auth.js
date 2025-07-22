"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
const router = (0, express_1.Router)();
router.post('/new', [
    (0, express_validator_1.body)('nombre', 'El nombre es obligatorio').notEmpty(),
    (0, express_validator_1.body)('telefono', 'El teléfono es obligatorio').notEmpty(),
    (0, express_validator_1.body)('telefono', 'El teléfono debe ser válido').isMobilePhone('es-PY'),
    (0, express_validator_1.body)('email', 'El email es obligatorio').isEmail(),
    (0, express_validator_1.body)('password', 'La contraseña es obligatoria').notEmpty(),
    middlewares_1.validarCampos
], controllers_1.crearUsuario);
router.post('/', [
    (0, express_validator_1.body)('email', 'El email es obligatorio').isEmail(),
    (0, express_validator_1.body)('password', 'La contraseña es obligatoria').notEmpty(),
    middlewares_1.validarCampos
], controllers_1.login);
router.get('/renew', middlewares_1.validarJWT, controllers_1.renewToken);
exports.default = router;
//# sourceMappingURL=auth.js.map