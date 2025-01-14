import { body } from 'express-validator';
import {
  handleValidatorErrorsMiddleware,
  validateExtraFields,
} from '@shared/middlewares';

export const searchNicknameValidatorRules = [
  // Invalid properties
  validateExtraFields(['nickname'], []),
  // Express Validator
  body('nickname')
    .notEmpty()
    .withMessage('NICKNAME is required')
    .trim()
    .escape()
    .isLength({ min: 2 })
    .withMessage('NICKNAME must be at least 2 characters long'),
  // Esta siempre irá de ultimo ya que devuelve los errores en caso de que existan
  handleValidatorErrorsMiddleware,
];
