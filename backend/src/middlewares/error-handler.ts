import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: { statusCode?: number; message?: string },
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "На сервере произошла ошибка";
  res.status(statusCode).json({ message });
};
