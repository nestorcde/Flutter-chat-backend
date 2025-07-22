"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setUsuarioImage = exports.updateProfile = void 0;
const models_1 = require("../models");
const fs_1 = __importDefault(require("fs"));
const util_1 = require("util");
const unlinkAsync = (0, util_1.promisify)(fs_1.default.unlink);
const updateProfile = async (req, res) => {
    try {
        const { uid, nombre, telefono } = req.body;
        const usuario = await models_1.Usuario.findById(uid);
        if (!usuario) {
            res.status(404).json({
                ok: false,
                msg: 'Usuario no encontrado'
            });
            return;
        }
        usuario.nombre = nombre;
        usuario.telefono = telefono;
        await usuario.save();
        const response = {
            ok: true,
            data: { usuario }
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
exports.updateProfile = updateProfile;
const setUsuarioImage = async (req, res) => {
    try {
        const { uid, random } = req.body;
        const miUsuario = await models_1.Usuario.findById(uid);
        if (!miUsuario) {
            res.status(404).json({
                ok: false,
                msg: 'Usuario no encontrado'
            });
            return;
        }
        if (req.file) {
            if (miUsuario.imgProfile !== 'blank-profile-picture.png') {
                try {
                    await unlinkAsync(`uploads/${miUsuario.imgProfile}`);
                    console.log('Archivo anterior removido');
                }
                catch (err) {
                    console.log('Error removiendo archivo anterior:', err);
                }
            }
            const posicion = req.file.mimetype.indexOf('/');
            const extension = req.file.mimetype.substring(posicion + 1);
            miUsuario.imgProfile = `${uid}${random}.${extension}`;
            await miUsuario.save();
            const response = {
                ok: true,
                data: { usuario: miUsuario }
            };
            res.status(200).json(response);
        }
        else {
            res.status(400).json({
                ok: false,
                msg: 'No hay archivo de imagen'
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador'
        });
    }
};
exports.setUsuarioImage = setUsuarioImage;
//# sourceMappingURL=profile.js.map