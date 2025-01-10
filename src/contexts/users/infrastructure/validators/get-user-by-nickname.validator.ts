import { param } from 'express-validator';
import {
  handleValidatorErrorsMiddleware,
  validateExtraFields,
} from '@shared/middlewares';

export const getUserByNicknameValidatorRules = [
  validateExtraFields([], []),
  // Invalid properties
  param('nickname')
    .trim()
    .escape()
    .isLength({ min: 2 })
    .withMessage('NICKNAME not found'),
  // Esta siempre irá de ultimo ya que devuelve los errores en caso de que existan
  handleValidatorErrorsMiddleware,
];
