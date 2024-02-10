import { NextFunction, Request, Response } from "express";

export class AppError extends Error {
  statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);

    Object.setPrototypeOf(this, new.target.prototype);
    this.name = Error.name;
    this.statusCode = statusCode;
    Error.captureStackTrace(this);
  }
}

// Error handling Middleware functions
// Error handling Middleware function for logging the error message
export const errorLogger = (
  err: Error,
  _req: Request,
  _res: Response,
  next: NextFunction
) => {
  console.log(err);
  next(err); // calling next middleware
};

// Error handling Middleware function reads the error message
// and sends back a response in JSON format
export const errorResponder = (
  error: AppError,
  _req: Request,
  response: Response,
  _next: NextFunction
) => {
  response.header("Content-Type", "application/json");

  const status = error.statusCode || 400;
  response.status(status).send(error.message);
};
