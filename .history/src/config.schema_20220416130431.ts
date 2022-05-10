import * as Joi from 'joi';

export const configValidationSchema = Joi.object({
    STAGE: Joi.string().valid('dev','test','prod').default('dev'),
    DATABASE_TYPE: Joi.string().re
    DATABASE_DB
    DATABASE_PORT
    DATABASE_USERNAME
    DATABASE_PASSWORD
    DATABASE_HOST
})