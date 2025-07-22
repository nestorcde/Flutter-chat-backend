"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setTutorial = exports.verificado = exports.usuarioDesconectado = exports.usuarioConectado = exports.getUsuarios = void 0;
const models_1 = require("../models");
const getUsuarios = async (req, res) => {
    try {
        const desde = Number(req.query['desde']) || 0;
        const miUsuario = await models_1.Usuario.findById(req.uid);
        if (!miUsuario) {
            res.status(404).json({
                ok: false,
                msg: 'Usuario no encontrado'
            });
            return;
        }
        let usuarios1 = [];
        if (miUsuario.admin) {
            usuarios1 = await models_1.Usuario
                .find({ $and: [{ _id: { $ne: req.uid } }, { admin: false }] })
                .sort('-online')
                .skip(desde)
                .limit(20);
        }
        else {
            usuarios1 = await models_1.Usuario
                .find({ $and: [{ _id: { $ne: req.uid } }, { admin: true }] })
                .sort('-online')
                .skip(desde)
                .limit(20);
        }
        const usuarios = [];
        for (const usuario of usuarios1) {
            try {
                const noLeidos = await models_1.Mensaje.find({
                    $and: [{ estado: '0', de: usuario._id, para: req.uid }]
                }).countDocuments();
                usuario.noLeidos = noLeidos;
                usuarios.push(usuario);
            }
            catch (error) {
                console.log('Error:', error);
            }
        }
        const response = {
            ok: true,
            data: { usuarios }
        };
        res.json(response);
    }
    catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
};
exports.getUsuarios = getUsuarios;
const usuarioConectado = async (uid) => {
    try {
        const usuario = await models_1.Usuario.findById(uid);
        if (usuario) {
            usuario.online = true;
            await usuario.save();
        }
        return usuario;
    }
    catch (error) {
        console.log('Error conectando usuario:', error);
        return null;
    }
};
exports.usuarioConectado = usuarioConectado;
const usuarioDesconectado = async (uid) => {
    try {
        const usuario = await models_1.Usuario.findById(uid);
        if (usuario) {
            usuario.online = false;
            await usuario.save();
        }
        return usuario;
    }
    catch (error) {
        console.log('Error desconectando usuario:', error);
        return null;
    }
};
exports.usuarioDesconectado = usuarioDesconectado;
const verificado = async (req, res) => {
    try {
        const { uid, valor } = req.body;
        const usuario = await models_1.Usuario.findById(uid);
        if (!usuario) {
            res.status(404).json({
                ok: false,
                msg: 'Usuario no encontrado'
            });
            return;
        }
        usuario.revisado = valor;
        await usuario.save();
        const response = {
            ok: true,
            data: { usuario }
        };
        res.status(200).json(response);
    }
    catch (error) {
        res.status(400).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
};
exports.verificado = verificado;
const setTutorial = async (req, res) => {
    try {
        const { uid } = req.body;
        const usuario = await models_1.Usuario.findById(uid);
        if (!usuario) {
            res.status(404).json({
                ok: false,
                msg: 'Usuario no encontrado'
            });
            return;
        }
        usuario.tutorial = true;
        await usuario.save();
        const response = {
            ok: true,
            data: { usuario }
        };
        res.status(200).json(response);
    }
    catch (error) {
        res.status(400).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
};
exports.setTutorial = setTutorial;
//# sourceMappingURL=usuario.js.map