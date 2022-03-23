const { response } = require("express");
const Turno = require('../models/turno');
const Usuario = require('../models/usuario');




const getTurnos = async (req, res = response)  => {
    

    // try {

        const turnos = await Turno.find({})
        .populate('uid', 'nombre email telefono')
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
    // } catch (error) {
    //     return res.status(401).json({
    //         ok: true,
    //         msg: 'Hable con el administrador',
    //         fecha: "2000-01-01T00:00:00.000Z",
    //         conn: false,
    //         propio: false
    //     });

    // }
    
    
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
        const fecha = new Date(Date.UTC(anho, mes-1, dia, 0, 0, 0, 0));
        req.body.fecha = fecha;
        req.body.uid = req.uid;
        const usuario = await Usuario.findById(req.uid);
        if(!usuario.admin){
            req.body.nombre = usuario.nombre;
        }
        const turno = new Turno(req.body);
        console.log('Grabando Turno '+ turno['uid']);
        await turno.save();
        return res.status(200).json({
            ok: true,
            msg: 'Turno Registrado',
            fecha: "2000-01-01T00:00:00.000Z",
            conn: true,
            propio: false
        });
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Error: Hable con el administrador',
            fecha: "2000-01-01T00:00:00.000Z",
            conn: false,
            propio: false
        });
    }
};

const eliminarTurno = async (req, res = response ) => {
    /* payload:{
        id: 'id'
     }*/
    try {
        const id = req.body.id;
        console.log('Eliminando Turno '+ id);
        await Turno.findByIdAndDelete(id).exec();
        return res.status(200).json({
            ok: true,
            msg: 'Turno Eliminado',
            fecha: "2000-01-01T00:00:00.000Z",
            conn: true,
            propio: false
        });
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Hable con el administrador',
            fecha: "2000-01-01T00:00:00.000Z",
            conn: false,
            propio: false
        });
    }
};

const verificarTurno = async (req, res = response ) => {
    try {
        const {dia, mes, anho, hora} = req.body;
        const fecha = new Date(Date.UTC(anho, mes-1, dia, 0, 0, 0, 0));
        const hoy = new Date();
        const ayer = new Date(Date.UTC(hoy.getFullYear(), hoy.getMonth(), hoy.getDay() , 0, 0, 0, 0));
        //console.log(ayer);
        const uid = req.uid;
        const usuario = await Usuario.findById(uid);
        const turnos = await Turno.find({ $or: [{uid: uid, fecha: {$gte: ayer}} , {hora: hora, fecha: fecha}]});
        if(turnos.length==0){
            return res.status(200).json({
                ok: true,
                conn: true,
                msg: 'No tiene turno marcado',
                fecha: "2000-01-01T00:00:00.000Z",
                propio: false
            });
        }else{
            if(turnos[0]['uid']==uid){
                if(usuario.admin){
                    return res.status(200).json({
                        ok: true,
                        conn: true,
                        msg: 'No tiene turno marcado',
                        fecha: "2000-01-01T00:00:00.000Z",
                        propio: false
                    });
                }else{
                    return res.status(200).json({
                        ok: false,
                        conn: true,
                        msg: 'Tiene turno marcado',
                        fecha: turnos[0].fecha,
                        propio: true
                    });
                }
            }else{
                return res.status(200).json({
                    ok: false,
                    conn: true,
                    msg: 'Turno ocupado por otra persona',
                    fecha: turnos[0].fecha,
                    propio: false
                });
            }
        }
    } catch (error) {
        return res.status(401).json({
            ok: false,
            conn: false,
            msg: 'Hable con el administrador',
            fecha: "2000-01-01T00:00:00.000Z",
            propio: false
        });
    }
};

module.exports = {
    getTurnos,
    registrarTurno,
    eliminarTurno,
    verificarTurno
}