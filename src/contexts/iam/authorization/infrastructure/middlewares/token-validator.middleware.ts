// src/modules/authentication/infrastructure/middlewares/AuthMiddleware.ts
import { tokenService } from '@src/contexts/iam/authentication/infrastructure/dependencies';
import { Request, Response, NextFunction } from 'express';

export const AuthMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization header is missing' });
  }

  const token = authHeader.split(' ')[1]; // Asumiendo formato "Bearer <token>"
  const payload = tokenService.verifyToken(token);

  if (!payload) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }

  // req.user = payload; // TODO: Añadir el usuario a la request
  next();
};
