const { response } = require("express");
const Usuario = require('../models/usuario');
const Mensaje = require('../models/mensaje');




const getUsuarios = async (req, res = response)  => {
    

    try {

        const desde = Number( req.query.desde) || 0;

        const miUsuario = await Usuario.findById(req.uid);
        let usuarios1 = [];

        if(miUsuario.admin){
            usuarios1= await Usuario
                .find( { $and: [{ _id: { $ne: req.uid }}, {admin: false}]})
                .sort('-online')
                .skip(desde)
                .limit(20);
        }else{
            usuarios1= await Usuario
            .find( { $and: [{ _id: { $ne: req.uid }}, {admin: true}]})
            .sort('-online')
            .skip(desde)
            .limit(20);
        }

            let usuarios = []
        
        for (let usuario of usuarios1) {
            
            try {
                await Mensaje.find({ $and: [{estado: 0, de: usuario._id, para: req.uid}] })
                    .countDocuments()
                    .exec()
                    .then((value)=>{
                        usuario.noLeidos = value
                        usuarios.push(usuario);
                });
                
            
            } catch (error) {
            console.log('error'+ error);
            } 
        }
        
        
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
};

const usuarioDesconectado = async ( uid = '' ) => {
    const usuario = await Usuario.findById(uid);
    usuario.online = false;
    await usuario.save();
    return usuario;
};

const verificado = async ( req, res = response ) => {
    try {
        const {uid, valor} = req.body;

        const usuario = await Usuario.findById(uid);
        usuario.revisado = valor;
        await usuario.save();
        
        return res.status(200).json({
            ok: true,
            usuario
        });
        
    } catch (error) {
        return res.status(400).json({
            ok: false,
            msg: 'Hable con el administrador'

        });
    }
};

const setTutorial = async ( req, res ) => {
    try {
        const {uid } = req.body;
        const usuario = await Usuario.findById(uid);
        usuario.tutorial = true;
        await usuario.save();

        return res.status(200).json({
            ok: true,
            usuario
        });
    } catch (error) {
        return res.status(400).json({
            ok: false,
            msg: 'Hable con el administrador'

        });
    }
};


module.exports = {
    getUsuarios,
    usuarioConectado,
    usuarioDesconectado,
    verificado,
    setTutorial
};