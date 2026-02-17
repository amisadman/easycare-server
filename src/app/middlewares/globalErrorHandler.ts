import { NextFunction, Request, Response } from "express";
import { envVars } from "../config";
import status from "http-status";
import z, { success } from "zod";
import { IErrorResponse, IErrorSources } from "../interface/error.interface";
import { handleZodError } from "../errorsHelpers/handleZodError";
import { stat } from "node:fs";

export const globalErrorHandler = async (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (envVars.NODE_ENV === "development") {
    console.log("Error from Global Error Handler", err);
  }

  let errorSources: IErrorSources[] = [];

  let statusCode: number = status.INTERNAL_SERVER_ERROR;
  let message: string = "Internal Server Error";
  let error: string = "";
  let stack : string | undefined = "";

  if (err instanceof z.ZodError) {
    const result = handleZodError(err);

    statusCode = result.statusCode as number;
    message = result.message;
    errorSources = [...(result.errorSources as IErrorSources[])];
    error = result.error as string;
    stack = result.stack as string;``
  }else if(err instanceof Error){
    statusCode = status.INTERNAL_SERVER_ERROR;
    message = err.message;
    stack = err.stack
  }
  const errorResponse: IErrorResponse = {
    success: false,
    message: message,
    errorSources,
    error: envVars.NODE_ENV === "development" ? error : undefined,
    stack: envVars.NODE_ENV === "development" ? stack : undefined,
  };

  res.status(statusCode).json(errorResponse);
};
