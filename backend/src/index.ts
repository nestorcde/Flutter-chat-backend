import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import path from 'path';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';

import { validateEnv } from './config/environment';
import { dbConnection } from './database/config';
import { initializeSocket } from './sockets/socket';
import { authRoutes, usuarioRoutes, mensajeRoutes, turnoRoutes, profileRoutes } from './routes';

// Environment configuration
dotenv.config();
const env = validateEnv();

// Express app
const app = express();

// Security middleware
app.use(helmet());
app.use(cors());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// Body parsing middleware
app.use(express.json());

// HTTP Server
const server = http.createServer(app);

// Socket.IO setup
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Initialize database connection
dbConnection();

// Initialize Socket.IO
initializeSocket(io);

// Static files
const publicPath = path.resolve(__dirname, '../public');
app.use(express.static(publicPath));

const uploadsPath = path.resolve(__dirname, '../uploads');
app.use('/uploads', express.static(uploadsPath));

// API Routes
app.use('/api/login', authRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/mensajes', mensajeRoutes);
app.use('/api/turnos', turnoRoutes);
app.use('/api/profile', profileRoutes);

// Health check endpoint
app.get('/health', (_req, res) => {
  res.json({ 
    ok: true, 
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    ok: false,
    msg: 'Internal server error'
  });
});

// 404 handler
app.use('*', (_req: express.Request, res: express.Response) => {
  res.status(404).json({
    ok: false,
    msg: 'Endpoint not found'
  });
});

// Start server
server.listen(env.PORT, () => {
  console.log(`🚀 Server running on port ${env.PORT}`);
  console.log(`📱 Environment: ${env.NODE_ENV}`);
  console.log(`🔗 Health check: http://localhost:${env.PORT}/health`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('Process terminated');
  });
});

export { io };