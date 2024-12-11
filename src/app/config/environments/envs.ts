import 'dotenv/config';
import * as joi from 'joi';

const envSchema = joi
  .object({
    PORT: joi.number().port().required(),
    NODE_ENV: joi
      .string()
      .valid('development', 'production', 'test')
      .required(),
    PUBLIC_PATH: joi.string().required(),
    // MongoDB
    MONGO_URL: joi.string().uri().required(),
    MONGO_DBNAME: joi.string().required(),
    MONGO_USER: joi.string().required(),
    MONGO_PASS: joi.string().required(),
    // Allowed Origins (CORS)
    ALLOWED_ORIGINS: joi.array().items(joi.string().uri()).required(), // ALLOWED_ORIGINS="http://localhost:5173,https://www.example.com"
  })
  .unknown(true);

const { error, value } = envSchema.validate({
  ...process.env,
  ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS.split(',').map((origin) =>
    origin.trim()
  ),
});
if (error) {
  throw new Error(`ENVs validation error: ${error.message}`);
}

interface IEnvVars {
  PORT: number;
  NODE_ENV: 'development' | 'production' | 'test';
  PUBLIC_PATH: string;
  // MongoDB
  MONGO_URL: string;
  MONGO_DBNAME: string;
  MONGO_USER: string;
  MONGO_PASS: string;
  // Allowed Origins (CORS)
  ALLOWED_ORIGINS: string[];
}
const envVars: IEnvVars = value;

export const envs = {
  PORT: envVars.PORT,
  NODE_ENV: envVars.NODE_ENV,
  PUBLIC_PATH: envVars.PUBLIC_PATH,
  // MongoDB
  MONGO_URL: envVars.MONGO_URL,
  MONGO_DBNAME: envVars.MONGO_DBNAME,
  MONGO_USER: envVars.MONGO_USER,
  MONGO_PASS: envVars.MONGO_PASS,
  // Allowed Origins (CORS)
  ALLOWED_ORIGINS: envVars.ALLOWED_ORIGINS,
};
