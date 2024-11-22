import 'dotenv/config';
import * as joi from 'joi';

const envSchema = joi
  .object({
    PORT: joi.number().port().required(),
    NODE_ENV: joi
      .string()
      .valid('development', 'production', 'test')
      .required(),
  })
  .unknown(true);

const { error, value } = envSchema.validate(process.env);
if (error) {
  throw new Error(`ENVs validation error: ${error.message}`);
}

interface IEnvVars {
  PORT: number;
  NODE_ENV: 'development' | 'production' | 'test';
}
const envVars: IEnvVars = value;

export const envs = {
  PORT: envVars.PORT,
  NODE_ENV: envVars.NODE_ENV,
};
