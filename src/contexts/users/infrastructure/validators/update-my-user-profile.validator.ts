import { body } from 'express-validator';
import {
  handleValidatorErrorsMiddleware,
  validateExtraFields,
} from '@shared/middlewares';

export const updateMyUserProfileValidatorRules = [
  // Invalid properties
  validateExtraFields(['bio', 'nickname', 'links'], ['file']),
  // Express Validator
  // body('bio') // ! bio es REQUERIDA en el Frontend pero en el Backend es opcional. (para reutilizar el endpoint para guardar los links)
  //   .notEmpty()
  //   .withMessage('BIO is required')
  //   .trim()
  //   .escape()
  //   .isLength({ min: 2 })
  //   .withMessage('BIO must be at least 2 characters long'),
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
