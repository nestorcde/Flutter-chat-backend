"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
const router = (0, express_1.Router)();
router.get('/', middlewares_1.validarJWT, controllers_1.getTurnos);
router.post('/nuevo', middlewares_1.validarJWT, controllers_1.registrarTurno);
router.delete('/', middlewares_1.validarJWT, controllers_1.eliminarTurno);
router.post('/verificar', middlewares_1.validarJWT, controllers_1.verificarTurno);
exports.default = router;
//# sourceMappingURL=turno.js.map