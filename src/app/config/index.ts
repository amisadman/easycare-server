import dotenv from "dotenv";
dotenv.config();

interface EnvConfig {
  PORT: string;
  BETTER_AUTH_URL: string;
  DATABASE_URL: string;
  NODE_ENV: string
}

const loadEnvVariables = (): EnvConfig => {
  const requireEnvVariable = ["PORT", "BETTER_AUTH_URL", "DATABASE_URL","NODE_ENV"];
  requireEnvVariable.forEach((variable) => {
    if (!process.env[variable]) {
      throw new Error(
        `Environment variable ${variable} is required but not set in .env file.`,
      );
    }
  });

  return {
    PORT: process.env.PORT as string,
    BETTER_AUTH_URL: process.env.BETTER_AUTH_URL as string,
    DATABASE_URL: process.env.DATABASE_URL as string,
    NODE_ENV: process.env.NODE_ENV as string
  };
};

export const envVars = loadEnvVariables();
