import { NextFunction, Request, Response } from "express";
import { envVars } from "../config";
import status from "http-status";
import { success } from "zod";
import { error } from "node:console";

export const globalErrorHandler = async(err: any,req: Request,res:Response,next: NextFunction) =>{

    if (envVars.NODE_ENV === 'development') {
        console.log("Error from Global Error Handler", err);
    }

    let statusCode : number = status.INTERNAL_SERVER_ERROR;
    let message: string = "Internal Server Error";
    
    
    res.status(statusCode).json({
        success: false,
        message:message,
        error : err.message
    });

}