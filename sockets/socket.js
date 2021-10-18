const { io } = require('../index');
const { comprobarJWT } = require('../middlewares/validar-jwt');
const { usuarioConectado, usuarioDesconectado, grabarMensaje} = require('../controller/socket');


// Mensajes de Sockets
io.on('connection', client => {
    console.log('Cliente conectado');

    const [valido, uid] = comprobarJWT(client.handshake.headers['x-token']);

    //verificar autenticacion
    if(!valido){ return client.disconnect();}

    //cliente conectado
    usuarioConectado(uid);

    //unir al cliente a una sala con su uid como nombre de sala.
    client.join(uid);

    //Escuchar mensaje
    client.on('mensaje-personal', async (payload) => {
        await grabarMensaje(payload);
        io.to(payload.para).emit('mensaje-personal', payload);
    });

    client.on('disconnect', () => {
        usuarioDesconectado(uid);
    });

    // client.on('mensaje', ( payload ) => {
    //     console.log('Mensaje', payload);

    //     io.emit( 'mensaje', { admin: 'Nuevo mensaje' } );

    // });


});
