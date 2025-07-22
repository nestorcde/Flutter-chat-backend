import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../types';
export declare const validarJWT: (req: AuthenticatedRequest, res: Response, next: NextFunction) => void;
export declare const comprobarJWT: (token?: string) => [boolean, string | null];
//# sourceMappingURL=validar-jwt.d.ts.map