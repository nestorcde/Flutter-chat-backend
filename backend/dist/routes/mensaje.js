"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
const router = (0, express_1.Router)();
router.get('/:de', middlewares_1.validarJWT, controllers_1.getMensajes);
exports.default = router;
//# sourceMappingURL=mensaje.js.map