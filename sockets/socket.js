const { io } = require('../index');
const { comprobarJWT } = require('../middlewares/validar-jwt');
const { grabarMensaje, mensajeLeido} = require('../controller/mensaje');
const { usuarioConectado, usuarioDesconectado} = require('../controller/usuario');
const { registrarTurno } = require('../controller/turno');
const Mensaje = require('../models/mensaje');


// Mensajes de Sockets
io.on('connection', client => {
    //console.log('Cliente conectado');

    const [valido, uid] = comprobarJWT(client.handshake.headers['x-token']);

    //verificar autenticacion
    if(!valido){ return client.disconnect();}

    //cliente conectado
    usuarioConectado(uid);
    io.emit('usuario-conectado-desconectado',{"uid":uid, "online":true});

    //unir al cliente a una sala con su uid como nombre de sala.
    client.join(uid);

    //Escuchar mensaje
    client.on('mensaje-personal', async (payload) => {
        
        const msg = await grabarMensaje(payload);
        io.to(payload.para).emit('mensaje-personal', msg);
        io.to(payload.de).emit('mensaje-personal', msg);
    });
    
    //Mensaje Leido
    client.on('mensaje-leido-sale', async (payload) => {
        await mensajeLeido(payload);
        io.to(payload.deUid).emit('mensaje-leido',payload);
        //console.log('Cliente desconectado');
    });

    //Escribiendo
    client.on('escribiendo-sale', async (payload) => {
        io.to(payload.paraUid).emit('escribiendo',payload);
    });

    //Grabar Turno
    client.on('registra-turno', async (payload)=> {
        //await registrarTurno(payload);
        io.emit('registra-turno', payload);
    });

    client.on('disconnect', () => {
        usuarioDesconectado(uid);
        io.emit('usuario-conectado-desconectado',{"uid":uid, "online":false});
        //console.log('Cliente desconectado');
    });
});
