import z from "zod";
import { IErrorResponse, IErrorSources } from "../interface/error.interface";
import status from "http-status";

export const handleZodError = (error: z.ZodError) => {
  const errorSources: IErrorSources[] = [];

  error.issues.forEach((issue) => {
    errorSources.push({
      path: issue.path.join("."),
      message: issue.message,
    });
  });
  const result: IErrorResponse = {
    statusCode: status.BAD_REQUEST,
    message: "Zod Validation Error",
    errorSources,
    error: error.message,
  };
  return result;
};
