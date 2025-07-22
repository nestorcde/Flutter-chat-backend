"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Usuario = void 0;
const mongoose_1 = require("mongoose");
const UsuarioSchema = new mongoose_1.Schema({
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
        type: Number,
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
    tutorial: {
        type: Boolean,
        default: false,
    },
});
UsuarioSchema.method('toJSON', function () {
    const { __v, _id, password, ...object } = this.toObject();
    object.uid = _id;
    return object;
});
exports.Usuario = (0, mongoose_1.model)('Usuario', UsuarioSchema);
//# sourceMappingURL=Usuario.js.map