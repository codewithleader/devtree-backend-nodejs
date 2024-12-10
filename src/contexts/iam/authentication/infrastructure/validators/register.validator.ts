import { body } from 'express-validator';
import { validateExtraFields } from '@src/contexts/shared/middlewares';
import { handleValidatorErrorsMiddleware } from '@shared/middlewares';

// Definir las reglas de validación
export const registerValidatorRules = [
  // Invalid properties
  validateExtraFields(['nickname', 'name', 'email', 'password']),
  // Express Validator
  body('nickname')
    .notEmpty()
    .withMessage('NICKNAME is required')
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
    .withMessage(
      'PASSWORD must be at least 6 characters long and contain at least one number and one uppercase letter'
    ),
  // Esta siempre irá de ultimo ya que devuelve los errores en caso de que existan
  handleValidatorErrorsMiddleware,
];
