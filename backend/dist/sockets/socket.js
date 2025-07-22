"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeSocket = void 0;
const middlewares_1 = require("../middlewares");
const mensaje_1 = require("../controllers/mensaje");
const usuario_1 = require("../controllers/usuario");
const initializeSocket = (io) => {
    io.on('connection', (client) => {
        const token = client.handshake.headers['x-token'];
        const [valido, uid] = (0, middlewares_1.comprobarJWT)(token);
        if (!valido || !uid) {
            client.disconnect();
            return;
        }
        (0, usuario_1.usuarioConectado)(uid)
            .then(() => {
            io.emit('usuario-conectado-desconectado', { uid, online: true });
        })
            .catch(console.error);
        client.join(uid);
        client.on('mensaje-personal', async (payload) => {
            try {
                const msg = await (0, mensaje_1.grabarMensaje)(payload);
                if (msg) {
                    io.to(payload.para).emit('mensaje-personal', msg);
                    io.to(payload.de).emit('mensaje-personal', msg);
                }
            }
            catch (error) {
                console.error('Error grabando mensaje:', error);
            }
        });
        client.on('mensaje-leido-sale', async (payload) => {
            try {
                const success = await (0, mensaje_1.mensajeLeido)(payload);
                if (success) {
                    io.to(payload.deUid).emit('mensaje-leido', payload);
                }
            }
            catch (error) {
                console.error('Error marcando mensaje como leído:', error);
            }
        });
        client.on('escribiendo-sale', (payload) => {
            io.to(payload.paraUid).emit('escribiendo', payload);
        });
        client.on('registra-turno', (payload) => {
            io.emit('registra-turno', payload);
        });
        client.on('revisa-usuario', (payload) => {
            io.to(payload.uid).emit('reiniciar', payload);
        });
        client.on('disconnect', () => {
            (0, usuario_1.usuarioDesconectado)(uid)
                .then(() => {
                io.emit('usuario-conectado-desconectado', { uid, online: false });
            })
                .catch(console.error);
        });
    });
};
exports.initializeSocket = initializeSocket;
//# sourceMappingURL=socket.js.map