"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mensaje = void 0;
const mongoose_1 = require("mongoose");
const MensajeSchema = new mongoose_1.Schema({
    de: {
        type: String,
        required: true,
    },
    para: {
        type: String,
        required: true,
    },
    mensaje: {
        type: String,
        required: true,
    },
    estado: {
        type: String,
        required: false,
        default: '0'
    }
}, {
    timestamps: true
});
MensajeSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    return { ...object, uid: _id };
});
exports.Mensaje = (0, mongoose_1.model)('Mensaje', MensajeSchema);
//# sourceMappingURL=Mensaje.js.map