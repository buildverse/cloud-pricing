import * as Joi from 'joi';

export const configValidationSchema = Joi.object({
    STAGE: Joi.string().valid('dev','test','prod').default('dev'),
    DATABASE_TYPE: Joi.string().required(),
    DATABASE_DB: Joi.string().required(),
    DATABASE_PORT : Joi.num
    DATABASE_USERNAME
    DATABASE_PASSWORD
    DATABASE_HOST
})