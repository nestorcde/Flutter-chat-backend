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
        .limit(30);

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

module.exports = {
    getMensajes
}