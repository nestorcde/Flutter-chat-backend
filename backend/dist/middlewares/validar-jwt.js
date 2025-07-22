"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.comprobarJWT = exports.validarJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validarJWT = (req, res, next) => {
    const token = req.header('x-token');
    if (!token) {
        res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición'
        });
        return;
    }
    try {
        const { uid } = jsonwebtoken_1.default.verify(token, process.env['JWT_KEY']);
        req.uid = uid;
        next();
    }
    catch (error) {
        console.log(error);
        res.status(401).json({
            ok: false,
            msg: 'Token inválido'
        });
    }
};
exports.validarJWT = validarJWT;
const comprobarJWT = (token = '') => {
    try {
        const { uid } = jsonwebtoken_1.default.verify(token, process.env['JWT_KEY']);
        return [true, uid];
    }
    catch (error) {
        return [false, null];
    }
};
exports.comprobarJWT = comprobarJWT;
//# sourceMappingURL=validar-jwt.js.map