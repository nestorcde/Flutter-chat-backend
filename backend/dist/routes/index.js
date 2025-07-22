"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.profileRoutes = exports.turnoRoutes = exports.mensajeRoutes = exports.usuarioRoutes = exports.authRoutes = void 0;
var auth_1 = require("./auth");
Object.defineProperty(exports, "authRoutes", { enumerable: true, get: function () { return __importDefault(auth_1).default; } });
var usuario_1 = require("./usuario");
Object.defineProperty(exports, "usuarioRoutes", { enumerable: true, get: function () { return __importDefault(usuario_1).default; } });
var mensaje_1 = require("./mensaje");
Object.defineProperty(exports, "mensajeRoutes", { enumerable: true, get: function () { return __importDefault(mensaje_1).default; } });
var turno_1 = require("./turno");
Object.defineProperty(exports, "turnoRoutes", { enumerable: true, get: function () { return __importDefault(turno_1).default; } });
var profile_1 = require("./profile");
Object.defineProperty(exports, "profileRoutes", { enumerable: true, get: function () { return __importDefault(profile_1).default; } });
//# sourceMappingURL=index.js.map