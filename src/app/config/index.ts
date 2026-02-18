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
}

const loadEnvVariables = (): EnvConfig => {
  const requireEnvVariable = ["PORT", "BETTER_AUTH_URL", "DATABASE_URL","NODE_ENV", "ACCESS_TOKEN_SECRET", "REFRESH_TOKEN_SECRET", "ACCESS_TOKEN_EXPIRATION", "REFRESH_TOKEN_EXPIRATION", "BETTER_AUTH_COOKIE_EXPIRATION"];
  requireEnvVariable.forEach((variable) => {
    if (!process.env[variable]) {
      // throw new Error(
      //   `Environment variable ${variable} is required but not set in .env file.`,
      // );
      throw new AppError(status.INTERNAL_SERVER_ERROR, `Environment variable ${variable} is required but not set in .env file.`);
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
    BETTER_AUTH_COOKIE_EXPIRATION: process.env.BETTER_AUTH_COOKIE_EXPIRATION as string,
  };
};

export const envVars = loadEnvVariables();
