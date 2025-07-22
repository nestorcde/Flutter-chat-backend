import { Response } from 'express';
import { AuthenticatedRequest, CreateMessageRequest, IMensaje } from '../types';
export declare const getMensajes: (req: AuthenticatedRequest, res: Response) => Promise<void>;
export declare const grabarMensaje: (payload: CreateMessageRequest & {
    de: string;
}) => Promise<IMensaje | false>;
export declare const mensajeLeido: (payload: {
    uid: string;
}) => Promise<boolean>;
//# sourceMappingURL=mensaje.d.ts.map