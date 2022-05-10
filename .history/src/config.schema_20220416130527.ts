import * as Joi from 'joi';

export const configValidationSchema = Joi.object({
    STAGE: Joi.string().valid('dev','test','prod').default('dev'),
    DATABASE_TYPE: Joi.string().required(),
    DATABASE_DB: Joi.string().required(),
    DATABASE_PORT : Joi.number().default(5432),
    DATABASE_USERNAME : Joi.string().required(),
    DATABASE_PASSWORD : Joi.string().required(),
  DATABASE_HOST: Joi.string().required(),
})