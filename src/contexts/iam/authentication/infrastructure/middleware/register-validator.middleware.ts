import type { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';
import { StatusCodes } from 'http-status-codes';

export function registerValidatorMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  body('nickname')
    .notEmpty()
    .isLength({ min: 4 })
    .withMessage('Nickname is required');

  body('name').notEmpty().isLength({ min: 4 }).withMessage('Name is required');

  body('email').isEmail().withMessage('Invalid email');

  body('password')
    .isLength({ min: 6 })
    .isStrongPassword()
    .withMessage(
      'Password must be at least 6 characters long and contain at least one number, one symbol and one uppercase letter'
    );

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(StatusCodes.BAD_REQUEST).json({ error: errors.array() });
  }

  next();
}
