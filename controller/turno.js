const { response } = require("express");
const Turno = require('../models/turno');




const getTurnos = async (req, res = response)  => {
    

    try {

        const miId = req.uid;

        const turnos = await Turno.find({})
        .populate('uid', 'nombre email')
        .sort({
            anho: 'desc',
            mes: 'desc',
            dia: 'desc',
            hora: 'asc'
        });

        var  datos = new Map();

        await turnos.forEach(turno => {
            const options = {  year: 'numeric', month: 'numeric', day: 'numeric' };
            let fecha = new Date(turno.anho,turno.mes-1,turno.dia).toISOString();
            let fechaTxt = fecha;
            let existe = false;
            var arreglo = [];

            
            
            if(datos.has(fechaTxt)){
                existe = true;
                arreglo = datos.get(fechaTxt);
            }

            if(existe){
                arreglo.push(turno);
                datos.set(fechaTxt, arreglo);
            }else{
                datos.set(fechaTxt, [turno]);
            }
        });

        var mapas = new Map();
        mapas.set('uno', [1,2,3,4]);
        mapas.set('dos', [4,5,6,7]);

        const event = Object.fromEntries(datos);

        res.json({
            ok:true,
            event
        });
    } catch (error) {
        return res.status(401).json({
            ok: true,
            msg: 'Hable con el administrador'
        });

    }
    
    
};

const registrarTurno = async (req, res = response ) => {
    /* payload:{
        dia: 0,
        mes: 0,
        anho: 0,
        hora: ''
     }*/
    try {
        const {dia, mes, anho} = req.body;
        const fecha = new Date(Date.UTC(anho, mes, dia, 0, 0, 0))
        req.body.fecha = fecha;
        req.body.uid = req.uid;
        const turno = new Turno(req.body);
        console.log('Grabando Turno '+ turno['uid']);
        await turno.save();
        return res.status(401).json({
            ok: true,
            msg: 'Turno Registrado'
        });
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Error: Hable con el administrador'
        });
    }
};

const eliminarTurno = async (req, res = response ) => {
    /* payload:{
        id: 'id'
     }*/
    try {
        const id = req.body.id;
        console.log('id: '+id);
        console.log('Eliminando Turno '+ id);
        await Turno.findByIdAndDelete(id).exec();
        return res.status(401).json({
            ok: true,
            msg: 'Turno Eliminado'
        });
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Hable con el administrador',
            error
        });
    }
};

const verificarTurno = async (req, res = response ) => {
    /* payload:{
        dia: 0,
        mes: 0,
        anho: 0,
     }*/
    try {
        const uid = req.uid;
        const {dia, mes, anho} = req.body;
        const fecha = new Date(Date.UTC(anho, mes, dia, 0, 0, 0))
        const turnos = await Turno.find({ uid: uid, fecha: {$gte: new Date()}})
        console.log(turnos);
        return res.status(401).json({
            ok: true,
            msg: 'Turno Eliminado'
        });
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Hable con el administrador',
            error
        });
    }
};

module.exports = {
    getTurnos,
    registrarTurno,
    eliminarTurno,
    verificarTurno
}