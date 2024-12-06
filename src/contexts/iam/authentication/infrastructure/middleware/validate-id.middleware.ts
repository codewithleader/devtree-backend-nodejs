import type { Request, Response, NextFunction } from 'express';

export function validateId(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;
  if (!/^\d+$/.test(id)) {
    return res
      .status(400)
      .json({ error: `ID argument is not a number. Invalid id: ${id}` });
  }
  next();
}
