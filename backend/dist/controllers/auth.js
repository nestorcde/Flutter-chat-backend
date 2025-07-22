"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.renewToken = exports.login = exports.crearUsuario = void 0;
const express_validator_1 = require("express-validator");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const models_1 = require("../models");
const jwt_1 = require("../helpers/jwt");
const crearUsuario = async (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json({
            ok: false,
            msg: 'Errores de validación',
            errors: errors.array()
        });
        return;
    }
    const { email, password } = req.body;
    try {
        const existeEmail = await models_1.Usuario.findOne({ email });
        if (existeEmail) {
            res.status(400).json({
                ok: false,
                msg: 'El email ya está registrado'
            });
            return;
        }
        const usuario = new models_1.Usuario(req.body);
        const salt = bcryptjs_1.default.genSaltSync();
        usuario.password = bcryptjs_1.default.hashSync(password, salt);
        await usuario.save();
        const token = await (0, jwt_1.generarJWT)(usuario.id);
        const response = {
            ok: true,
            data: {
                usuario,
                token
            }
        };
        res.json(response);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador'
        });
    }
};
exports.crearUsuario = crearUsuario;
const login = async (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json({
            ok: false,
            msg: 'Errores de validación',
            errors: errors.array()
        });
        return;
    }
    const { email, password } = req.body;
    try {
        const usuarioDB = await models_1.Usuario.findOne({ email });
        if (!usuarioDB) {
            res.status(404).json({
                ok: false,
                msg: 'Email no registrado'
            });
            return;
        }
        const validarPassword = bcryptjs_1.default.compareSync(password, usuarioDB.password);
        if (!validarPassword) {
            res.status(404).json({
                ok: false,
                msg: 'Contraseña inválida'
            });
            return;
        }
        const token = await (0, jwt_1.generarJWT)(usuarioDB.id);
        const response = {
            ok: true,
            data: {
                usuario: usuarioDB,
                token
            }
        };
        res.json(response);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
};
exports.login = login;
const renewToken = async (req, res) => {
    try {
        const uid = req.uid;
        const token = await (0, jwt_1.generarJWT)(uid);
        const usuario = await models_1.Usuario.findById(uid);
        const response = {
            ok: true,
            data: {
                usuario,
                token
            }
        };
        res.json(response);
    }
    catch (error) {
        res.status(401).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
};
exports.renewToken = renewToken;
//# sourceMappingURL=auth.js.map