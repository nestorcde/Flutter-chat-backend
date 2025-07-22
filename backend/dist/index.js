"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const dotenv_1 = __importDefault(require("dotenv"));
const environment_1 = require("./config/environment");
const config_1 = require("./database/config");
const socket_1 = require("./sockets/socket");
const routes_1 = require("./routes");
dotenv_1.default.config();
const env = (0, environment_1.validateEnv)();
const app = (0, express_1.default)();
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);
app.use(express_1.default.json());
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});
exports.io = io;
(0, config_1.dbConnection)();
(0, socket_1.initializeSocket)(io);
const publicPath = path_1.default.resolve(__dirname, '../public');
app.use(express_1.default.static(publicPath));
const uploadsPath = path_1.default.resolve(__dirname, '../uploads');
app.use('/uploads', express_1.default.static(uploadsPath));
app.use('/api/login', routes_1.authRoutes);
app.use('/api/usuarios', routes_1.usuarioRoutes);
app.use('/api/mensajes', routes_1.mensajeRoutes);
app.use('/api/turnos', routes_1.turnoRoutes);
app.use('/api/profile', routes_1.profileRoutes);
app.get('/health', (_req, res) => {
    res.json({
        ok: true,
        message: 'Server is running',
        timestamp: new Date().toISOString()
    });
});
app.use((err, _req, res, _next) => {
    console.error(err.stack);
    res.status(500).json({
        ok: false,
        msg: 'Internal server error'
    });
});
app.use('*', (_req, res) => {
    res.status(404).json({
        ok: false,
        msg: 'Endpoint not found'
    });
});
server.listen(env.PORT, () => {
    console.log(`🚀 Server running on port ${env.PORT}`);
    console.log(`📱 Environment: ${env.NODE_ENV}`);
    console.log(`🔗 Health check: http://localhost:${env.PORT}/health`);
});
process.on('SIGTERM', () => {
    console.log('SIGTERM received, shutting down gracefully');
    server.close(() => {
        console.log('Process terminated');
    });
});
//# sourceMappingURL=index.js.map