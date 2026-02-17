import { NextFunction, Request, Response } from "express";
import z from "zod";

export const validateRequest = (zodObject: z.ZodObject) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const persedResult = zodObject.safeParse(req.body);

    if (!persedResult.success) {
      return next(persedResult.error);
    }

    req.body = persedResult.data;
    next();
  };
};
