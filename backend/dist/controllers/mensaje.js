"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mensajeLeido = exports.grabarMensaje = exports.getMensajes = void 0;
const models_1 = require("../models");
const getMensajes = async (req, res) => {
    try {
        const miId = req.uid;
        const mensajeDe = req.params['de'];
        const mensajes = await models_1.Mensaje.find({
            $or: [
                { de: miId, para: mensajeDe },
                { de: mensajeDe, para: miId }
            ]
        }).sort({ createdAt: 'desc' });
        const response = {
            ok: true,
            data: { mensajes }
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
exports.getMensajes = getMensajes;
const grabarMensaje = async (payload) => {
    try {
        const mensaje = new models_1.Mensaje(payload);
        const msg = await mensaje.save();
        return msg;
    }
    catch (error) {
        console.log('Error grabando mensaje:', error);
        return false;
    }
};
exports.grabarMensaje = grabarMensaje;
const mensajeLeido = async (payload) => {
    try {
        const { uid } = payload;
        const mensaje = await models_1.Mensaje.findById(uid);
        if (!mensaje) {
            return false;
        }
        mensaje.estado = '1';
        await mensaje.save();
        return true;
    }
    catch (error) {
        console.log('Error marcando mensaje como leído:', error);
        return false;
    }
};
exports.mensajeLeido = mensajeLeido;
//# sourceMappingURL=mensaje.js.map