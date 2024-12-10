import type { RequestHandler } from 'express';
import { validationResult } from 'express-validator';
import { StatusCodes } from 'http-status-codes';

// Middleware para manejar los errores de validación
export const handleValidatorErrorsMiddleware: RequestHandler = (
  req,
  res,
  next
) => {
  const errors = validationResult(req);
  const localErrors = res.locals.validationErrors || [];

  if (!errors.isEmpty() || localErrors.length > 0) {
    res.status(StatusCodes.BAD_REQUEST).json({
      errors: [...localErrors, ...errors.array()],
    });
    return;
  }

  next();
};
