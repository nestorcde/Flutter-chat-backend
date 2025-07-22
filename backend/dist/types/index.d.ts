import { Request } from 'express';
import { Document } from 'mongoose';
export interface IUsuario extends Document {
    _id: string;
    nombre: string;
    telefono: string;
    imgProfile: string;
    email: string;
    password: string;
    online: boolean;
    noLeidos: number;
    revisado: boolean;
    admin: boolean;
    tutorial: boolean;
    uid?: string;
}
export interface IMensaje extends Document {
    _id: string;
    de: string;
    para: string;
    mensaje: string;
    estado: string;
    createdAt: Date;
    updatedAt: Date;
}
export interface ITurno extends Document {
    _id: string;
    usuario: string;
    nombre: string;
    telefono: string;
    day: number;
    month: number;
    year: number;
    hour: string;
    date: Date;
    createdAt: Date;
    updatedAt: Date;
}
export interface AuthenticatedRequest extends Request {
    uid?: string;
}
export interface ApiResponse<T = any> {
    ok: boolean;
    msg?: string;
    data?: T;
}
export interface LoginRequest {
    email: string;
    password: string;
}
export interface CreateUserRequest {
    nombre: string;
    telefono: string;
    email: string;
    password: string;
    imgProfile?: string;
}
export interface CreateMessageRequest {
    para: string;
    mensaje: string;
}
export interface CreateTurnoRequest {
    usuario: string;
    nombre: string;
    telefono: string;
    day: number;
    month: number;
    year: number;
    hour: string;
    date?: Date;
}
export interface SocketUser {
    uid: string;
    nombre: string;
}
export interface JwtPayload {
    uid: string;
    iat?: number;
    exp?: number;
}
export interface EnvironmentVariables {
    PORT: string;
    DB_CON: string;
    JWT_KEY: string;
    NODE_ENV?: string;
}
//# sourceMappingURL=index.d.ts.map