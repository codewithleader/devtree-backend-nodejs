import { body } from 'express-validator';
import { validateExtraFields } from '@shared/middlewares';

// Definir las reglas de validación
export const loginValidatorRules = [
  // Invalid properties
  validateExtraFields(['email', 'password']),
  // Express Validator
  body('email')
    .notEmpty()
    .withMessage('EMAIL is required')
    .trim()
    .escape()
    .isEmail()
    .withMessage('EMAIL is not valid'),
  body('password')
    .notEmpty()
    .withMessage('PASSWORD is required')
    .trim()
    .isStrongPassword({
      minLength: 6,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 0,
    })
    .withMessage('Wrong password'),
];
