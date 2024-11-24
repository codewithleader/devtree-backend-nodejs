import 'dotenv/config';
import * as joi from 'joi';

const envSchema = joi
  .object({
    PORT: joi.number().port().required(),
    NODE_ENV: joi
      .string()
      .valid('development', 'production', 'test')
      .required(),
    // MongoDB
    MONGO_URL: joi.string().uri().required(),
    MONGO_DBNAME: joi.string().required(),
    MONGO_USER: joi.string().required(),
    MONGO_PASS: joi.string().required(),
  })
  .unknown(true);

const { error, value } = envSchema.validate(process.env);
if (error) {
  throw new Error(`ENVs validation error: ${error.message}`);
}

interface IEnvVars {
  PORT: number;
  NODE_ENV: 'development' | 'production' | 'test';
  // MongoDB
  MONGO_URL: string;
  MONGO_DBNAME: string;
  MONGO_USER: string;
  MONGO_PASS: string;
}
const envVars: IEnvVars = value;

export const envs = {
  PORT: envVars.PORT,
  NODE_ENV: envVars.NODE_ENV,
  // MongoDB
  MONGO_URL: envVars.MONGO_URL,
  MONGO_DBNAME: envVars.MONGO_DBNAME,
  MONGO_USER: envVars.MONGO_USER,
  MONGO_PASS: envVars.MONGO_PASS,
};
