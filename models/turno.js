const { Schema, model} = require('mongoose');

const TurnoSchema = Schema({
    uid: {
        type: Schema.Types.String,
        required: true
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
    }
},{
    timestamps: true
});

TurnoSchema.method('toJSON', function(){
    const { __v, _id, ...object} = this.toObject();
    return object;
});

module.exports = model('Turno', TurnoSchema);