import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

export const validarCampos = (req: Request, res: Response, next: NextFunction): void => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).json({
      ok: false,
      msg: 'Errores de validación',
      errors: errors.array()
    });
    return;
  }

  next();
};