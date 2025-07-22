"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConnection = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dbConnection = async () => {
    try {
        await mongoose_1.default.connect(process.env['DB_CON']);
        console.log('Base de datos online');
    }
    catch (error) {
        console.log(error);
        throw new Error('Error en la base de datos - Ver logs');
    }
};
exports.dbConnection = dbConnection;
//# sourceMappingURL=config.js.map