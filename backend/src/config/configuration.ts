import { Logger } from '@nestjs/common';

// Configuration file to load and validate environment variables
export default () => {
  const logger = new Logger('Configuration');
  const requiredEnvVars = {
    DB_HOST: process.env.DB_HOST as string,
    DB_PORT: parseInt(process.env.DB_PORT as string),
    DB_USERNAME: process.env.DB_USERNAME as string,
    DB_PASSWORD: process.env.DB_PASSWORD as string,
    DB_NAME: process.env.DB_NAME as string,
    JWT_SECRET: process.env.JWT_SECRET as string,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN as string,
    JWT_ISSUER: process.env.JWT_ISSUER as string,
    JWT_AUDIENCE: process.env.JWT_AUDIENCE as string,
  };
  const optionalEnvVars = {
    DB_SSL: process.env.DB_SSL === 'true',
    DB_MIGRATIONS_RUN: process.env.DB_MIGRATIONS_RUN === 'true',
  };

  const missingVars = Object.entries(requiredEnvVars)
    .filter(([, value]) => !value)
    .map(([key]) => key);
  if (missingVars.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingVars.join(', ')}`,
    );
  }
  const Envs = {
    ...requiredEnvVars,
    ...optionalEnvVars,
  };
  logger.log('Environment variables loaded successfully');
  logger.log(
    `Loaded variables: ${Object.entries(Envs)
      .map(([key, value]) => `${key}=${value}`)
      .join(', ')}`,
  );
  return Envs;
};
