"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const profile_1 = require("../controllers/profile");
const middlewares_1 = require("../middlewares");
const multer_1 = require("../config/multer");
const router = (0, express_1.Router)();
router.post('/', [
    (0, express_validator_1.body)('nombre', 'El nombre es obligatorio').notEmpty(),
    (0, express_validator_1.body)('telefono', 'El teléfono es obligatorio').notEmpty(),
    (0, express_validator_1.body)('telefono', 'El teléfono debe ser válido').isMobilePhone('es-PY'),
    middlewares_1.validarCampos,
    middlewares_1.validarJWT
], profile_1.updateProfile);
router.post('/imageProfile', multer_1.upload.single('imgProfile'), profile_1.setUsuarioImage);
exports.default = router;
//# sourceMappingURL=profile.js.map