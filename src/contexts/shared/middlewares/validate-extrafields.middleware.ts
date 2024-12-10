import type { RequestHandler } from 'express';

// Middleware personalizado como RequestHandler
export const validateExtraFields = (
  allowedFields: string[]
): RequestHandler => {
  return (req, res, next) => {
    const bodyKeys = Object.keys(req.body);
    res.locals.validationErrors = res.locals.validationErrors || [];

    // Detectar propiedades adicionales
    const extraFields = bodyKeys.filter((key) => !allowedFields.includes(key));
    if (extraFields.length > 0) {
      res.locals.validationErrors.push({
        type: 'field',
        msg: 'Invalid properties in request body',
        path: extraFields,
        location: 'body',
      });
    }
    // if (extraFields.length > 0) {
    // res.status(StatusCodes.BAD_REQUEST).json({
    //   message: 'Invalid properties in request body',
    //   extraFields,
    // });
    // return;
    // }

    // Continuar con la cadena de middlewares
    next();
  };
};
