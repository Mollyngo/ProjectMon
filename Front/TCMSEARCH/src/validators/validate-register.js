import Joi from "joi";
import validate from "./validate";

const registerSchema = Joi.object({
    first_name: Joi.string().trim().messages({
        'string.empty': 'first name is required'
    }),
    last_name: Joi.string().trim().messages({
        'string.empty': 'last name is required'
    }),
    email: Joi.string().email({ tlds: false }).required().messages({
        'string.empty': "email is required",
    }),
    password: Joi.string().pattern(/^[a-zA-Z0-9]{4,}$/).required().messages({
        'string.empty': "password is required",
        "string.pattern.base": "password must be at least 6 characters and contain only alphabet and number"
    }),
    mobile: Joi.string().messages({
        'string.empty': "mobile is required"
    }),

});

const validateRegister = input => validate(registerSchema, input)

export default validateRegister