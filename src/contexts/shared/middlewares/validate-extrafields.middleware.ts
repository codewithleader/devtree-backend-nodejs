import type { RequestHandler } from 'express';

/**
 * Middleware to validate extra fields in the request body and files.
 *
 * This middleware checks for any fields in `req.body` and `req.files` that are not allowed.
 * If any extra fields are found, they are added to `res.locals.validationErrors` without interrupting the request flow. The final middleware (e.g., `handleValidatorErrors`) should handle the response with all accumulated validation errors.
 * @param {string[]} allowedBodyFields - Allowed fields in `req.body`.
 * @param {string[]} [allowedFileFields=[]] - Allowed fields in `req.files`. (Optional)
 * @returns {RequestHandler} - Custom Middleware to validate extra fields.
 *
 * @example
 * // Usage in an Express route
 * import { validateExtraFields } from './middlewares/validate-extrafields.middleware';
 *
 * const allowedBodyFields = ['name', 'email', 'password'];
 * const allowedFileFields = ['profilePicture'];
 *
 * app.post(
 *   'users/me/profile',
 *   validateExtraFields(allowedBodyFields, allowedFileFields),
 *   handleValidatorErrorsMiddleware, // The final middleware should handle the response if there are validation errors
 *   (req, res) => {
 *   // Handle the request
 * });
 */
export const validateExtraFields = (
  allowedBodyFields: string[],
  allowedFileFields: string[] = []
): RequestHandler => {
  return (req, res, next) => {
    const validationErrors: Array<Record<string, any>> = [];

    // Validate body fields
    const extraBodyFields = validateFields(req.body, allowedBodyFields);
    if (extraBodyFields.length > 0) {
      validationErrors.push(
        createErrorObject(
          'Invalid properties in request body',
          extraBodyFields,
          'body'
        )
      );
    }

    // Validate file fields
    if (req.files) {
      const extraFileFields = validateFields(req.files, allowedFileFields);
      if (extraFileFields.length > 0) {
        validationErrors.push(
          createErrorObject(
            'Invalid properties in request files',
            extraFileFields,
            'files'
          )
        );
      } else if (
        allowedFileFields.length === 0 &&
        Object.keys(req.files).length > 0
      ) {
        validationErrors.push(
          createErrorObject(
            'No allowed fields in request files',
            Object.keys(req.files),
            'files'
          )
        );
      }
    }

    // Store errors in res.locals for further processing
    res.locals.validationErrors = (res.locals.validationErrors || []).concat(
      validationErrors
    );

    next();
  };
};

/**
 * Validates fields against a list of allowed fields.
 *
 * @param {Record<string, any>} inputFields - The fields to validate.
 * @param {string[]} allowedFields - The list of allowed fields.
 * @returns {string[]} - List of extra fields that are not allowed.
 */
const validateFields = (
  inputFields: Record<string, any>,
  allowedFields: string[]
): string[] => {
  const inputKeys = Object.keys(inputFields || {});
  return inputKeys.filter((key) => !allowedFields.includes(key));
};

/**
 * Creates a validation error object.
 *
 * @param {string} message - The error message.
 * @param {string[]} paths - The invalid fields.
 * @param {string} location - The location of the error (`body` or `files`).
 * @returns {Record<string, any>} - The error object.
 */
const createErrorObject = (
  message: string,
  paths: string[],
  location: string
): Record<string, any> => {
  return {
    type: 'field',
    msg: message,
    path: paths,
    location,
  };
};
