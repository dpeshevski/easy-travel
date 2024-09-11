import { Request, Response, NextFunction } from 'express';

export function errorHandlingMiddleware(err: any, req: Request, res: Response, next: NextFunction) {
  console.error(err); // Log error information to console or a logging service

  res.status(err.status || 500).json({
    message: err.message || 'An unexpected error occurred.',
    details: err.details || {}
  });
}
