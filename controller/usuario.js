const { response } = require("express");
const Usuario = require('../models/usuario');




const getUsuarios = async (req, res = response)  => {
    

    try {

        const desde = Number( req.query.desde) || 0;

        const usuarios= await Usuario
            .find( { _id: { $ne: req.uid }})
            .sort('-online')
            .skip(desde)
            .limit(20);
        res.json({
            ok:true,
            usuarios
        });
    } catch (error) {
        return res.status(401).json({
            ok: true,
            msg: 'Hable con el administrador'
        });

    }
    
    
};

const usuarioConectado = async ( uid = '' ) => {
    const usuario = await Usuario.findById(uid);
    usuario.online = true;
    await usuario.save();
    return usuario;
}

const usuarioDesconectado = async ( uid = '' ) => {
    const usuario = await Usuario.findById(uid);
    usuario.online = false;
    await usuario.save();
    return usuario;
}

module.exports = {
    getUsuarios,
    usuarioConectado,
    usuarioDesconectado
}