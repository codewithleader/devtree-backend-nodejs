import type { Request, Response, NextFunction } from 'express';
import { body } from 'express-validator';
import { StatusCodes } from 'http-status-codes';

// Definir las reglas de validación
export const registerValidatorRules = [
  // Invalid properties
  (req: Request, res: Response, next: NextFunction) => {
    const allowedFields = ['nickname', 'name', 'email', 'password'];
    const bodyKeys = Object.keys(req.body);

    // Detectar propiedades adicionales
    const extraFields = bodyKeys.filter((key) => !allowedFields.includes(key));
    if (extraFields.length > 0) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: 'Invalid properties in request body',
        extraFields,
      });
    }
    next();
  },
  // Express Validator
  body('nickname')
    .notEmpty()
    .withMessage('Nickname is required')
    .trim()
    .escape()
    .isLength({ min: 4 })
    .withMessage('NICKNAME must be at least 4 characters long'),
  body('name')
    .notEmpty()
    .trim()
    .escape()
    .isLength({ min: 4 })
    .withMessage('NAME is required'),
  body('email')
    .notEmpty()
    .withMessage('EMAIL is required')
    .trim()
    .escape()
    .isEmail()
    .withMessage('EMAIL is not valid'),
  body('password')
    .isStrongPassword({
      minLength: 6,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 0,
    })
    .withMessage(
      'Password must be at least 6 characters long and contain at least one number and one uppercase letter'
    ),
];
