"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
const router = (0, express_1.Router)();
router.get('/', middlewares_1.validarJWT, controllers_1.getUsuarios);
router.post('/revisar', controllers_1.verificado);
router.post('/tutorial', controllers_1.setTutorial);
exports.default = router;
//# sourceMappingURL=usuario.js.map