import { Response } from 'express';
import { AuthenticatedRequest } from '../types';
export declare const crearUsuario: (req: AuthenticatedRequest, res: Response) => Promise<void>;
export declare const login: (req: AuthenticatedRequest, res: Response) => Promise<void>;
export declare const renewToken: (req: AuthenticatedRequest, res: Response) => Promise<void>;
//# sourceMappingURL=auth.d.ts.map