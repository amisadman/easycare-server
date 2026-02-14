import dotenv from "dotenv";
dotenv.config();

interface EnvConfig {
  PORT: string;
  BETTER_AUTH_URL: string;
  DATABASE_URL: string;
}

const loadEnvVariables = (): EnvConfig => {
  const requireEnvVariable = ["PORT", "BETTER_AUTH_URL", "DATABASE_URL"];
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
  };
};

export const envVars = loadEnvVariables();
