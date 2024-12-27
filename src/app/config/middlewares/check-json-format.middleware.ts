import { ResponseFormat } from '@shared/utils';
import type { ErrorRequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

export const checkJSONFormatMiddleware: ErrorRequestHandler = (
  error,
  req,
  res,
  next
) => {
  if (
    //
    error.status === 400 &&
    error instanceof SyntaxError &&
    'body' in error
  ) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json(ResponseFormat.error('Body with invalid JSON format'));
    return;
  }
  next();
};
