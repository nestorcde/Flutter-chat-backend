const { Schema, model} = require('mongoose');
const Mensaje = require('../models/mensaje');

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: true,
    },
    telefono: {
        type: String,
        required: true,
    },
    imgProfile: {
        type: String,
        required: true,
        default: 'blank-profile-picture.png'
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    online: {
        type: Boolean,
        default: false,
    },
    noLeidos: {
        type: Schema.Types.Number,
        // ref: 'Mensaje',
        default: 0
    },
    revisado: {
        type: Boolean,
        default: false,
    },
    admin: {
        type: Boolean,
        default: false,
    },
});

UsuarioSchema.method('toJSON', function(){
    const { __v, _id, password, ...object} = this.toObject();
    object.uid = _id;
    return object;
});

module.exports = model('Usuario', UsuarioSchema);