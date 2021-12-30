const { response } = require("express");
const Usuario = require('../models/usuario');
const multer = require('multer');


const updateProfile = async (req, res = response) => {

    try {

        const { uid, nombre, telefono } = req.body;

        const usuario = await Usuario.findOne({_id: uid});

        usuario.nombre = nombre;
        usuario.telefono = telefono;

        await usuario.save();

        res.json({
            ok: true,
            usuario
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador'
        });
    }

    
};

const setUsuarioImage = async (req, res = response) => {
    
    //console.log(req);
    try {        
        
        const miUsuario = await Usuario.findById(req.body.uid);
        
        if(req.file){
            const posicion = req.file.mimetype.search('/') ;
            miUsuario.imgProfile = req.body.uid +"."+ req.file.mimetype.trim().substring(posicion+1);
            miUsuario.save();
            //console.log(req.file);
            res.status(200).json({
                ok: true,
                usuario: miUsuario
            });
        }else{
            res.status(500).json({
                ok: false,
                msg: 'No hay campo File'
            });
        }
    } catch (error) {
        //console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador'
        });
    }
};

module.exports = {
    updateProfile,
    setUsuarioImage
};