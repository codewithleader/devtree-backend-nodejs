import { RequestHandler } from 'express';
import formidable, { Files } from 'formidable';
import { StatusCodes } from 'http-status-codes';
import { ResponseFormat } from '@contexts/shared/utils';
import colors from 'colors';

/* New property `files` to the Request */
declare global {
  namespace Express {
    interface Request {
      files?: Files;
    }
  }
}

export const mediaFilesFormidableMiddleware: RequestHandler = (
  req,
  res,
  next
) => {
  const contentType = req.headers['content-type'] || '';
  if (!contentType.includes('multipart/form-data')) {
    return next(); // No procesar si no es form-data
  }

  const form = formidable({
    multiples: false,
    // keepExtensions: true, // Mantener la extensión original del archivo
    maxFileSize: 10485760, // 10 * 1024 * 1024, // Tamaño máximo de archivo: 10MB = 10.485.760 bytes (Limite de Cloudinary)
  });

  form.parse(req, (err, fields, files) => {
    if (err) {
      if (err.code === 1009) {
        // se pasó del tamaño permitido
        res
          .status(StatusCodes.BAD_REQUEST)
          .json(
            ResponseFormat.error('Max Total File Size exceeded. Max: 10MB')
          );
        return;
      }
      // Otro error desconocido
      console.error(
        colors.bgRed.white(
          `Error parsing form data (formidable middleware): ${err}`
        )
      );
      res
        .status(StatusCodes.BAD_REQUEST)
        .json(ResponseFormat.error('Error parsing form data'));
      return;
    }

    // Normalizar los campos
    // Si es un array con un solo elemento, convertirlo en un solo valor. Ej: { name: ['John'] } => { name: 'John' }
    const normalizedBodyFields: Record<string, any> = {};
    Object.keys(fields).forEach((key) => {
      const value = fields[key];
      normalizedBodyFields[key] =
        Array.isArray(value) && value.length === 1 ? value[0] : value;
    });

    // Normalizar los Files (Ta guena la idea pero se pierde el tipado de formidable (Files))
    // Si es un array con un solo elemento, convertirlo en un solo valor. Ej: { name: ['John'] } => { name: 'John' } sino { name: ['John', 'Doe'] } => { name: ['John', 'Doe'] }
    // const normalizedFiles: Record<string, any> = {};
    // Object.keys(files).forEach((key) => {
    //   const value = req.files[key];
    //   normalizedFiles[key] =
    //     Array.isArray(value) && value.length === 1 ? value[0] : value;
    // });
    // req.files = normalizedFiles; // Campos normalizados. `req.files.file` is the key for the file

    req.body = normalizedBodyFields; // Campos normalizados
    req.files = files; // `req.files.file` is the key for the file

    next();
  });
};
