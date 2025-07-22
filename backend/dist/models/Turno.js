"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Turno = void 0;
const mongoose_1 = require("mongoose");
const TurnoSchema = new mongoose_1.Schema({
    usuario: {
        type: String,
        required: true
    },
    nombre: {
        type: String,
        required: true,
    },
    telefono: {
        type: String,
        required: false,
    },
    day: {
        type: Number,
        required: true,
    },
    month: {
        type: Number,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    hour: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    }
}, {
    timestamps: true
});
TurnoSchema.method('toJSON', function () {
    const { __v, ...object } = this.toObject();
    return object;
});
exports.Turno = (0, mongoose_1.model)('Turno', TurnoSchema);
//# sourceMappingURL=Turno.js.map