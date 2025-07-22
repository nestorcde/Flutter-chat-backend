# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run start:dev` - Start development server with nodemon auto-reload
- `npm start` - Start production server
- No test framework configured (test script returns error)

## Architecture Overview

This is a Node.js backend for a Flutter chat application with appointment scheduling functionality. Built with Express.js and Socket.IO for real-time messaging.

### Core Structure

**Entry Point**: `index.js` - Express server with Socket.IO integration

**Key Directories**:
- `controller/` - Business logic (auth, mensaje, usuario, turno, profile, socket)
- `models/` - Mongoose schemas (Usuario, Mensaje, Turno)
- `routes/` - API endpoints grouped by resource
- `middlewares/` - JWT validation and field validation
- `sockets/` - Real-time WebSocket event handlers
- `database/` - MongoDB connection configuration
- `helpers/` - JWT token utilities
- `uploads/` - File storage (publicly accessible)

### Database Models

**Usuario**: User accounts with `nombre`, `telefono`, `email`, `password`, `imgProfile`, `online` status, `noLeidos` count, `admin` and `tutorial` flags

**Mensaje**: Messages with `de`/`para` user references, `mensaje` content, `estado` status

**Turno**: Appointments with user reference, contact details, separate day/month/year/hour fields plus Date object

### Authentication

JWT-based auth using `x-token` header:
- Token generation: `helpers/jwt.js`
- Validation middleware: `middlewares/validar-jwt.js`
- Password hashing with bcryptjs
- Socket.IO connections also require JWT validation

### API Structure

Base pattern: `/api/[resource]`
- `/api/login` - Authentication (new, login, renew)
- `/api/usuarios` - User management
- `/api/mensajes` - Messaging
- `/api/turnos` - Appointments
- `/api/profile` - Profile management

### Environment Variables

Required:
- `PORT` - Server port
- `DB_CON` - MongoDB connection string  
- `JWT_KEY` - JWT signing secret

### Real-time Features

Socket.IO handles:
- User online/offline status
- Instant messaging with read receipts
- Appointment notifications
- User review status updates

### File Uploads

Multer handles file uploads to `/uploads` directory (publicly served). Primarily for profile images with fallback to "blank-profile-picture.png".

## Recent Project Changes

### TypeScript Migration (Latest - v2.0.0)
- **Complete TypeScript rewrite** with strict type checking
- **Updated dependencies**: Express v4.19.2, Socket.IO v4.7.5, Mongoose v8.2.1
- **Modern security**: Helmet, CORS, rate limiting, input validation with Zod
- **New project structure**: `/src` directory with organized modules
- **Enhanced development**: ts-node-dev for hot reloading, ESLint for code quality
- **Breaking changes**: Socket.IO v4 API, Mongoose v8 schema definitions
- **Build system**: TypeScript compilation to `/dist` directory

### Project Restructure 
- All backend code moved to `/backend` directory
- Root-level files deleted (controller/, models/, routes/, etc.)
- Main application structure now contained within backend folder
- Frontend likely to be added as separate directory structure

## TypeScript Development

### New Scripts
- `npm run dev` - Start development server with hot reload
- `npm run build` - Compile TypeScript to JavaScript
- `npm run typecheck` - Type checking without compilation
- `npm run lint` - Code linting with ESLint

### Environment Variables
Copy `.env.example` to `.env` and configure:
- `PORT` - Server port (default: 3000)
- `DB_CON` - MongoDB connection string
- `JWT_KEY` - JWT signing secret (required)
- `NODE_ENV` - Environment (development/production/test)