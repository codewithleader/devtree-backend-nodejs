import type { RequestHandler } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
// Instancies
import { tokenService } from '@src/contexts/iam/authentication/infrastructure/dependencies';

export const tokenValidatorMiddleware: RequestHandler = (req, res, next) => {
  const authHeader = req.headers.authorization; // Bearer token

  if (!authHeader) {
    res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: ReasonPhrases.UNAUTHORIZED });
    return;
  }

  const token = authHeader.split(' ')[1]; // Asumiendo formato "Bearer <token>"
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
    res.locals.userId = payload.id; // RESPONSE: Añadido user al response.locals
  }

  next();
};
