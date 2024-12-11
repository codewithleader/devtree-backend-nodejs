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
      // Agregar errores a la respuesta pero sin interrumpir las demas validaciones ya que en el ultimo middleware (handleValidatorErrors) se responde con todos los errores si existen.
      res.locals.validationErrors.push({
        type: 'field',
        msg: 'Invalid properties in request body',
        path: extraFields,
        location: 'body',
      });
    }

    // Continuar con la cadena de middlewares
    next();
  };
};
