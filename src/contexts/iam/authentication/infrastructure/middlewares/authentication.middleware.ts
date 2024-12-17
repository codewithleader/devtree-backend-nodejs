import type { Request, RequestHandler } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
// Instancies
import { tokenService } from '@src/contexts/iam/authentication/infrastructure/dependencies';
import { userRepository } from '@src/contexts/users/infrastructure/dependencies';
import { IUser } from '@src/contexts/users/domain';

/* New property `user` to the Request */
declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

export const authenticationMiddleware: RequestHandler = async (
  req,
  res,
  next
) => {
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
    const user = await userRepository.findById(payload.id);
    if (!user) {
      res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: 'Invalid or expired token' });
      return;
    }
    req.user = user;
  }

  next();
};

const extractBearerTokenFromHeaders = (
  request: Request
): string | undefined => {
  const [type, token] = request.headers.authorization?.split(' ') ?? [];
  return type === 'Bearer' ? token : undefined; // Cuando en postman elegimos Authorization Bearer Token. Pero se puede personalizar como en el caso de 'ApiKey'
};
