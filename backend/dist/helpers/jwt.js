"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verificarJWT = exports.generarJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generarJWT = (uid) => {
    return new Promise((resolve, reject) => {
        const payload = { uid };
        jsonwebtoken_1.default.sign(payload, process.env['JWT_KEY'], {
            expiresIn: '24h'
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('No se pudo generar el JWT');
            }
            else {
                resolve(token);
            }
        });
    });
};
exports.generarJWT = generarJWT;
const verificarJWT = (token) => {
    try {
        const { uid } = jsonwebtoken_1.default.verify(token, process.env['JWT_KEY']);
        return [true, uid];
    }
    catch (error) {
        return [false, null];
    }
};
exports.verificarJWT = verificarJWT;
//# sourceMappingURL=jwt.js.map