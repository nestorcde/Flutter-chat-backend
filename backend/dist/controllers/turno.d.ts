import { Response } from 'express';
import { AuthenticatedRequest } from '../types';
export declare const getTurnos: (_req: AuthenticatedRequest, res: Response) => Promise<void>;
export declare const registrarTurno: (req: AuthenticatedRequest, res: Response) => Promise<void>;
export declare const eliminarTurno: (req: AuthenticatedRequest, res: Response) => Promise<void>;
export declare const verificarTurno: (req: AuthenticatedRequest, res: Response) => Promise<void>;
//# sourceMappingURL=turno.d.ts.map