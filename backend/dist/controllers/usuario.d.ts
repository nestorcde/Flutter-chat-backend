import { Response } from 'express';
import { AuthenticatedRequest, IUsuario } from '../types';
export declare const getUsuarios: (req: AuthenticatedRequest, res: Response) => Promise<void>;
export declare const usuarioConectado: (uid: string) => Promise<IUsuario | null>;
export declare const usuarioDesconectado: (uid: string) => Promise<IUsuario | null>;
export declare const verificado: (req: AuthenticatedRequest, res: Response) => Promise<void>;
export declare const setTutorial: (req: AuthenticatedRequest, res: Response) => Promise<void>;
//# sourceMappingURL=usuario.d.ts.map