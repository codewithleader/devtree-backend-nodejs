import type { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';
import { StatusCodes } from 'http-status-codes';

// Definir las reglas de validación
export const loginValidatorRules = [
  body('email').trim().escape().isEmail().withMessage('Email is not valid'),
  body('password')
    .isStrongPassword({
      minLength: 6,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 0,
    })
    .withMessage('Wrong password'),
];

// Middleware para manejar los errores de validación
export function loginValidatorMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(StatusCodes.BAD_REQUEST).json({ error: errors.array() });
  }
  next();
}
