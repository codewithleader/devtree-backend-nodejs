import type { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

export const checkJSONFormatMiddleware = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (
    //
    error.status === 400 &&
    error instanceof SyntaxError &&
    'body' in error
  ) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: 'Body with invalid JSON format' });
  }
  next();
};
