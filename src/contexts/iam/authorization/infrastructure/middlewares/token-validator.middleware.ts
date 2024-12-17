import type { Request, RequestHandler } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
// Instancies
import { tokenService } from '@src/contexts/iam/authentication/infrastructure/dependencies';
import { REQUEST_USER_KEY } from '@src/contexts/users/users.constants';

export const tokenValidatorMiddleware: RequestHandler = (req, res, next) => {
  const token = extractBearerTokenFromHeaders(req);

  if (!token) {
    res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: ReasonPhrases.UNAUTHORIZED });
    return;
  }

  const payload = tokenService.verifyToken(token);

  if (!payload) {
    res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: 'Invalid or expired token' });
    return;
  }

  if (typeof payload === 'object' && payload.id) {
    req[REQUEST_USER_KEY] = { id: payload.id }; // REQUEST: Al usar "['propertyName']" typescript no molesta.
    // res.locals.user.id = payload.id; // Opcion 2: RESPONSE: Añadido user al response.locals typescript no molesta tampoco
  }

  next();
};

const extractBearerTokenFromHeaders = (
  request: Request
): string | undefined => {
  const [type, token] = request.headers.authorization?.split(' ') ?? [];
  return type === 'Bearer' ? token : undefined; // Cuando en postman elegimos Authorization Bearer Token. Pero se puede personalizar como en el caso de 'ApiKey'
};
