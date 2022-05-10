import * as Joi from 'joi';

export const configValidationSchema = Joi.object({
    STAGE: Joi.string().re
    DATABASE_TYPE
    DATABASE_DB
    DATABASE_PORT
    DATABASE_USERNAME
    DATABASE_PASSWORD
    DATABASE_HOST
})