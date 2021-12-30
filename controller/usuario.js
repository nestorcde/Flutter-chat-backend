const { response } = require("express");
const Usuario = require('../models/usuario');
const Mensaje = require('../models/mensaje');




const getUsuarios = async (req, res = response)  => {
    

    // try {

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
    
            //return usuarios1
        //      finally{
            
        //   }
        }
        //console.log('fin')

        //const usuarios1 = await procesMultipleCandidates(usuarios);
        
        
        res.json({
            ok:true,
            usuarios
        });
    // } catch (error) {
    //     return res.status(401).json({
    //         ok: true,
    //         msg: 'Hable con el administrador'
    //     });

    // }
    
    
};

async function procesMultipleCandidates  ( data)  {
    let usuarios1 = []
    //Promise.all(data.map(async (usuario) => {

    for (const usuario of data) {
      
      try {
        usuario.noLeidos = async() => await Mensaje.countDocuments({ estado: 0}, (_err, value)=>value).exec();
        usuarios1.push(usuario)
        console.log(usuario.toString())
      } catch (error) {
        console.log('error'+ error);
      } 

      //return usuarios1
    //      finally{
        
    //   }
    }
    console.log('fin')
    return usuarios1 // return without waiting for process of 
  }

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