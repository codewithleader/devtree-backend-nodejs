import type { Request, RequestHandler } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
// Instancies
import { AuthDependencyFactory } from '@contexts/iam/authentication/infrastructure/dependencies';
import { UserDependencyFactory } from '@contexts/users/infrastructure/dependencies';
import { IUser } from '@contexts/users/infrastructure/datasources/aws/mongodb/models';
import { ResponseFormat } from '@shared/utils';

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
  const tokenService = AuthDependencyFactory.getTokenService();
  const userRepository = UserDependencyFactory.getUserRepository();

  const token = extractBearerTokenFromHeaders(req);

  if (!token) {
    res
      .status(StatusCodes.UNAUTHORIZED)
      .json(ResponseFormat.error(ReasonPhrases.UNAUTHORIZED));
    return;
  }

  const payload = tokenService.verifyToken(token);

  if (!payload) {
    res
      .status(StatusCodes.UNAUTHORIZED)
      .json(ResponseFormat.error('Invalid or expired token'));
    return;
  }

  if (typeof payload === 'object' && payload.id) {
    const user = await userRepository.findById(payload.id);
    if (!user) {
      res
        .status(StatusCodes.UNAUTHORIZED)
        .json(ResponseFormat.error('Invalid or expired token'));
      return;
    }
    req.user = user as IUser;
  }

  next();
};

const extractBearerTokenFromHeaders = (
  request: Request
): string | undefined => {
  const [type, token] = request.headers.authorization?.split(' ') ?? [];
  return type === 'Bearer' ? token : undefined; // Cuando en postman elegimos Authorization Bearer Token. Pero se puede personalizar como en el caso de 'ApiKey'
};
