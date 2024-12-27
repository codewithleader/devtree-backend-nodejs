import { body, param } from 'express-validator';
import {
  handleValidatorErrorsMiddleware,
  validateExtraFields,
} from '@shared/middlewares';

export const updateUserProfileValidatorRules = [
  // Invalid properties
  validateExtraFields(['bio', 'nickname']),
  // Express Validator
  body('bio')
    .notEmpty()
    .withMessage('BIO is required')
    .trim()
    .escape()
    .isLength({ min: 2 })
    .withMessage('BIO must be at least 2 characters long'),
  body('nickname')
    .notEmpty()
    .withMessage('NICKNAME is required')
    .trim()
    .escape()
    .isLength({ min: 2 })
    .withMessage('NICKNAME must be at least 2 characters long'),
  param('id')
    // .notEmpty()
    // .withMessage('ID is required')
    .isLength({ min: 24, max: 24 })
    .withMessage('ID is not valid'),
  // Esta siempre irá de ultimo ya que devuelve los errores en caso de que existan
  handleValidatorErrorsMiddleware,
];
