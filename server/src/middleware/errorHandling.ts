import { NextFunction, Request, Response } from 'express';
import HttpException from '../exceptions/Http';
 
function errorMiddleware(error: HttpException, request: Request, response: Response, next: NextFunction) {
  const status = error.status || 500;
  const message = error.message || 'Something bad happened...';
  response
    .status(status)
    .json({
      status,
      message,
    });
}
 
export default errorMiddleware;