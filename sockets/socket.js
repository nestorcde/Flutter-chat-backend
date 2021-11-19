const { io } = require('../index');
const { comprobarJWT } = require('../middlewares/validar-jwt');
const { grabarMensaje, mensajeLeido} = require('../controller/mensaje');
const { usuarioConectado, usuarioDesconectado} = require('../controller/usuario');
const { registrarTurno } = require('../controller/turno');


// Mensajes de Sockets
io.on('connection', client => {
    //console.log('Cliente conectado');

    const [valido, uid] = comprobarJWT(client.handshake.headers['x-token']);

    //verificar autenticacion
    if(!valido){ return client.disconnect();}

    //cliente conectado
    usuarioConectado(uid);
    io.emit('usuario-conectado-desconectado');

    //unir al cliente a una sala con su uid como nombre de sala.
    client.join(uid);

    //Escuchar mensaje
    client.on('mensaje-personal', async (payload) => {
        await grabarMensaje(payload);
        io.to(payload.para).emit('mensaje-personal', payload);
    });
    
    //Mensaje Leido
    client.on('mensaje-leido', async (payload) => {
        await mensajeLeido(payload);
        io.to(payload.deUid).emit('mensaje-leido',payload);
        //console.log('Cliente desconectado');
    });

    //Grabar Turno
    client.on('registra-turno', async (payload)=> {
        await registrarTurno(payload);
        io.emit('registra-turno', payload);
    });

    client.on('disconnect', () => {
        usuarioDesconectado(uid);
        io.emit('usuario-conectado-desconectado');
        //console.log('Cliente desconectado');
    });
});
