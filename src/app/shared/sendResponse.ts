import { Response } from "express";

interface IResponseData<T> {
  httpStatusCode: number;
  success: boolean;
  message?: string;
  data?: T;
}

export const sendResponse = <T>(res: Response, data: IResponseData<T>) => {
  res.status(data.httpStatusCode).json({
    success: data.success,
    message: data.message,
    data: data.data,
  });
};
