import dotenv from "dotenv";
import AppError from "../errorsHelpers/AppError";
import status from "http-status";
dotenv.config();

interface EnvConfig {
  PORT: string;
  BETTER_AUTH_URL: string;
  DATABASE_URL: string;
  NODE_ENV: string;
  ACCESS_TOKEN_SECRET: string;
  REFRESH_TOKEN_SECRET: string;
  ACCESS_TOKEN_EXPIRATION: string;
  REFRESH_TOKEN_EXPIRATION: string;
  BETTER_AUTH_COOKIE_EXPIRATION: string;
  EMAIL_SENDER_SMTP_USER: string;
  EMAIL_SENDER_SMTP_PASS: string;
  EMAIL_SENDER_SMTP_PORT: string;
  EMAIL_SENDER_SMTP_HOST: string;
  EMAIL_SENDER_SMTP_FROM: string;
  GOOGLE_CLIENT_SECRET: string;
  GOOGLE_CLIENT_ID: string;
  FRONTEND_URL: string;
  CLOUDINARY_API_SECRET: string;
  CLOUDINARY_API_KEY: string;
  CLOUDINARY_CLOUD: string;
}

const loadEnvVariables = (): EnvConfig => {
  const requireEnvVariable = [
    "PORT",
    "BETTER_AUTH_URL",
    "DATABASE_URL",
    "NODE_ENV",
    "ACCESS_TOKEN_SECRET",
    "REFRESH_TOKEN_SECRET",
    "ACCESS_TOKEN_EXPIRATION",
    "REFRESH_TOKEN_EXPIRATION",
    "BETTER_AUTH_COOKIE_EXPIRATION",
    "EMAIL_SENDER_SMTP_USER",
    "EMAIL_SENDER_SMTP_FROM",
    "EMAIL_SENDER_SMTP_PASS",
    "EMAIL_SENDER_SMTP_HOST",
    "EMAIL_SENDER_SMTP_PORT",
    "GOOGLE_CLIENT_SECRET",
    "GOOGLE_CLIENT_ID",
    "FRONTEND_URL",
    "CLOUDINARY_API_SECRET",
    "CLOUDINARY_API_KEY",
    "CLOUDINARY_CLOUD",
  ];
  requireEnvVariable.forEach((variable) => {
    if (!process.env[variable]) {
      // throw new Error(
      //   `Environment variable ${variable} is required but not set in .env file.`,
      // );
      throw new AppError(
        status.INTERNAL_SERVER_ERROR,
        `Environment variable ${variable} is required but not set in .env file.`,
      );
    }
  });

  return {
    PORT: process.env.PORT as string,
    BETTER_AUTH_URL: process.env.BETTER_AUTH_URL as string,
    DATABASE_URL: process.env.DATABASE_URL as string,
    NODE_ENV: process.env.NODE_ENV as string,
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET as string,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET as string,
    ACCESS_TOKEN_EXPIRATION: process.env.ACCESS_TOKEN_EXPIRATION as string,
    REFRESH_TOKEN_EXPIRATION: process.env.REFRESH_TOKEN_EXPIRATION as string,
    BETTER_AUTH_COOKIE_EXPIRATION: process.env
      .BETTER_AUTH_COOKIE_EXPIRATION as string,
    EMAIL_SENDER_SMTP_USER: process.env.EMAIL_SENDER_SMTP_USER as string,
    EMAIL_SENDER_SMTP_FROM: process.env.EMAIL_SENDER_SMTP_FROM as string,
    EMAIL_SENDER_SMTP_PASS: process.env.EMAIL_SENDER_SMTP_PASS as string,
    EMAIL_SENDER_SMTP_HOST: process.env.EMAIL_SENDER_SMTP_HOST as string,
    EMAIL_SENDER_SMTP_PORT: process.env.EMAIL_SENDER_SMTP_PORT as string,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET as string,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID as string,
    FRONTEND_URL: process.env.FRONTEND_URL as string,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET as string,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY as string,
    CLOUDINARY_CLOUD: process.env.CLOUDINARY_CLOUD as string,
  };
};

export const envVars = loadEnvVariables();
