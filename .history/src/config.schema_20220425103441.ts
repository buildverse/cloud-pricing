import * as Joi from 'joi';

export const configValidationSchema = Joi.object({
  STAGE: Joi.string().valid('dev', 'test', 'prod').default('dev'),
  DATABASE_DB: Joi.string().required(),
  DATABASE_PORT: Joi.number().default(5432),
  DATABASE_USERNAME: Joi.string().required(),
  DATABASE_PASSWORD: Joi.string().required(),
  DATABASE_HOST: Joi.string().required(),
  DEBUG_LEVEL: Joi.string().valid('info', 'debug').default('info'),
  SAVE_CLOUD_PRICE_FILES_TO_STORAGE : Joi.boolean(),
});
