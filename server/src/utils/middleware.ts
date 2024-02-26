import { Request, Response, NextFunction } from 'express';
import * as yup from 'yup';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error('Error caught by middleware:', err);

  if (err.name === 'ValidationError') {
    return res.status(400).json({
      error: 'ValidationError',
      info: err.message,
    });
  }

  res.status(500).json({
    error: 'Internal Server Error',
    info: err.message,
  });
};

export const validate =
  (schema: yup.Schema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = await schema.validate(req.body);
      next();
    } catch (error) {
      next(error);
    }
  };
