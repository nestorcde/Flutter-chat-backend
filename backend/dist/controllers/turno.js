"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verificarTurno = exports.eliminarTurno = exports.registrarTurno = exports.getTurnos = void 0;
const models_1 = require("../models");
const getTurnos = async (_req, res) => {
    try {
        const turnos = await models_1.Turno.find({})
            .populate('usuario', 'nombre email telefono')
            .sort({
            year: 'desc',
            month: 'desc',
            day: 'desc',
            hour: 'asc'
        });
        const datos = new Map();
        turnos.forEach(turno => {
            const fecha = new Date(turno.year, turno.month - 1, turno.day).toISOString();
            const fechaTxt = fecha;
            if (datos.has(fechaTxt)) {
                const arreglo = datos.get(fechaTxt);
                arreglo.push(turno);
                datos.set(fechaTxt, arreglo);
            }
            else {
                datos.set(fechaTxt, [turno]);
            }
        });
        const event = Object.fromEntries(datos);
        const response = {
            ok: true,
            data: { event }
        };
        res.json(response);
    }
    catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
};
exports.getTurnos = getTurnos;
const registrarTurno = async (req, res) => {
    try {
        const { day, month, year, hour, nombre, telefono } = req.body;
        const fecha = new Date(Date.UTC(year, month - 1, day, 0, 0, 0, 0));
        const usuario = await models_1.Usuario.findById(req.uid);
        if (!usuario) {
            res.status(404).json({
                ok: false,
                msg: 'Usuario no encontrado'
            });
            return;
        }
        const turnoData = {
            usuario: req.uid,
            nombre: usuario.admin ? nombre : usuario.nombre,
            telefono: telefono || usuario.telefono,
            day,
            month,
            year,
            hour,
            date: fecha
        };
        const turno = new models_1.Turno(turnoData);
        await turno.save();
        res.status(200).json({
            ok: true,
            msg: 'Turno Registrado'
        });
    }
    catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error: Hable con el administrador'
        });
    }
};
exports.registrarTurno = registrarTurno;
const eliminarTurno = async (req, res) => {
    try {
        const { id } = req.body;
        await models_1.Turno.findByIdAndDelete(id);
        res.status(200).json({
            ok: true,
            msg: 'Turno Eliminado'
        });
    }
    catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
};
exports.eliminarTurno = eliminarTurno;
const verificarTurno = async (req, res) => {
    try {
        const { day, month, year, hour } = req.body;
        const fecha = new Date(Date.UTC(year, month - 1, day, 0, 0, 0, 0));
        const hoy = new Date();
        const ayer = new Date(Date.UTC(hoy.getFullYear(), hoy.getMonth(), hoy.getDate(), 0, 0, 0, 0));
        const uid = req.uid;
        const usuario = await models_1.Usuario.findById(uid);
        if (!usuario) {
            res.status(404).json({
                ok: false,
                msg: 'Usuario no encontrado'
            });
            return;
        }
        const turnos = await models_1.Turno.find({
            $or: [
                { usuario: uid, date: { $gte: ayer } },
                { hour: hour, date: fecha }
            ]
        });
        if (turnos.length === 0) {
            res.status(200).json({
                ok: true,
                msg: 'No tiene turno marcado',
                propio: false
            });
            return;
        }
        const turno = turnos[0];
        if (turno.usuario.toString() === uid) {
            if (usuario.admin) {
                res.status(200).json({
                    ok: true,
                    msg: 'No tiene turno marcado',
                    propio: false
                });
            }
            else {
                res.status(200).json({
                    ok: false,
                    msg: 'Tiene turno marcado',
                    fecha: turno.date,
                    propio: true
                });
            }
        }
        else {
            res.status(200).json({
                ok: false,
                msg: 'Turno ocupado por otra persona',
                fecha: turno.date,
                propio: false
            });
        }
    }
    catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
};
exports.verificarTurno = verificarTurno;
//# sourceMappingURL=turno.js.map