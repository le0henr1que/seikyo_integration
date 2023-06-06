import { Request, Response, NextFunction } from "express";
import { HttpError } from "../../shared/error";

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
export function errorMiddleware(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(err);
  console.error("Veio para o middleware");

  if (err instanceof HttpError) {
    return res.status(err.statusCode).json({
      error: true,
      message: err.message,
    });
  }

  return res.status(500).json({
    error: true,
    message: "Internal server error",
  });
}
