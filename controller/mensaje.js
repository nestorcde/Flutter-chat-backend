const { response } = require("express");
const Mensaje = require('../models/mensaje');




const getMensajes = async (req, res = response)  => {
    

    try {

        const desde = Number( req.query.desde) || 0;

        const miId = req.uid;

        const mensajeDe = req.params.de;

        const last30 = await Mensaje.find({
            $or: [{de: miId, para: mensajeDe}, {de: mensajeDe, para: miId}]
        })
        .sort({createdAt: 'desc'})
        //.limit(30);

        // const mensajes= await Mensaje
        //     .find( { _id: { $ne: req.uid }})
        //     .sort('-online')
        //     .skip(desde)
        //     .limit(20);
        res.json({
            ok:true,
            mensajes: last30
        });
    } catch (error) {
        return res.status(401).json({
            ok: true,
            msg: 'Hable con el administrador'
        });

    }
    
    
};

const grabarMensaje = async ( payload ) => {
    /* payload:{
        de: '',
        para: '',
        mensaje: ''
     }*/
    // console.log('de: '+payload['de']);
    // console.log('para: '+payload['para']);
    // console.log('mensaje: '+payload['mensaje']);
    try {
        const mensaje = new Mensaje(payload);
        //console.log('Grabando mensaje '+ mensaje['mensaje']);
        
        const msg = await mensaje.save();
        //console.log('mensaje: '+msg);
        return msg;
    } catch (error) {
        return false;
    }
};

const mensajeLeido = async ( payload ) => {
    /* payload:{
        uid: '''
     }*/
     //console.log("en mensajeLeido"+payload.uid);
    try {
        const {uid} = payload;
        const mensaje = await Mensaje.findById( payload.uid).exec();
        //console.log(mensaje);
        mensaje.estado = 1;
        //console.log('Mensaje Leido '+ mensaje);
        await mensaje.save();
        return true;
    } catch (error) {
        return false;
    }
};

module.exports = {
    getMensajes,
    grabarMensaje,
    mensajeLeido
}