const { Schema, model} = require('mongoose');

const fecha = Date.now();

const TurnoSchema = Schema({
    uid: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    nombre: {
        type: Schema.Types.String,
        required: true,
    },
    dia: {
        type: Schema.Types.Number,
        required: true,
    },
    mes: {
        type: Schema.Types.Number,
        required: true,
    },
    anho: {
        type: Schema.Types.Number,
        required: true,
    },
    hora: {
        type: Schema.Types.String,
        required: true,
    },
    fecha: {
        type: Schema.Types.Date,
        required: true,
        min: Date.UTC(fecha.year, fecha.month, fecha.day,0,0,0,0)
    }
},{
    timestamps: true
});

TurnoSchema.method('toJSON', function(){
    const { __v, ...object} = this.toObject();
    return object;
});

module.exports = model('Turno', TurnoSchema);