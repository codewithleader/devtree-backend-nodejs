import { Request, Response, NextFunction } from 'express';
import { body } from 'express-validator';
import { StatusCodes } from 'http-status-codes';

// Definir las reglas de validación
export const loginValidatorRules = [
  // Invalid properties
  (req: Request, res: Response, next: NextFunction) => {
    const allowedFields = ['email', 'password'];
    const bodyKeys = Object.keys(req.body);

    // Detectar propiedades adicionales
    const extraFields = bodyKeys.filter((key) => !allowedFields.includes(key));
    if (extraFields.length > 0) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: 'Invalid properties in request body (loginValidatorRules)',
        extraFields,
      });
    }
    next();
  },
  // Express Validator
  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .trim()
    .escape()
    .isEmail()
    .withMessage('Email is not valid'),
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
