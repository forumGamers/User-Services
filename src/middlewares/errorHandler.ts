import { ErrorRequestHandler, Request, Response, NextFunction } from "express";
import {
  ValidationError,
  ValidationErrorItem,
  UniqueConstraintError,
} from "sequelize";

export const errorHandler: ErrorRequestHandler = (
  err:
    | Error
    | ValidationError
    | ValidationErrorItem
    | UniqueConstraintError
    | any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let status: number = 500;
  let message: string = "Internal Server Error";

  if (err.name === "SequelizeUniqueConstraintError") {
    status = 400;
    if (err.parent.constraint === "Users_email_key") {
      message = "email is already use";
    } else if (err.parent.constraint === "Users_username_key") {
      message = "username is already use";
    } else {
      message = err.errors[0].message;
    }
  } else if (err.name === "SequelizeValidationError") {
    status = 400;
    message = err.errors[0].message;
  } else if (err.name === "Data not found") {
    status = 404;
    message = err.name;
  } else if (err.name === "invalid token" || err.name === "JsonWebTokenError") {
    status = 401;
    message = "Invalid token";
  } else if (err.name === "invalid input") {
    status = 400;
    message = err.msg;
  } else if (err.name === "Data exist") {
    status = 409;
    message = "Conflict";
  } else if (err.name === "invalid credentials") {
    status = 401;
    message = "invalid email/password";
  } else if (err.name === "failed update") {
    status = 501;
  } else if (err.name === "Forbidden") {
    status = 403;
    message = err.name;
  } else if (err.name === "payment error") {
    status = 502;
    message = "Failed to pay";
  } else if (err.name === "Error") {
    status = 403;
    message = err.message;
  } else if (err.name === "Bad Request") {
    status = 400;
    message = err.msg;
  } else if (err.name === "Data limit exceeded") {
    status = 413;
    message = err.name;
  }
  res.status(status).json({ message });
};
