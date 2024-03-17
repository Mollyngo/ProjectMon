const Joi = require('joi');
const validate = require('./validator');

const registerSchema = Joi.object({
    first_name: Joi.string().trim().messages({
        'string.empty': 'first name is required',
        'any.required': 'first name is required'
    }),
    last_name: Joi.string().trim().messages({
        'string.empty': 'last name is required',
        'any.required': 'last name is required'
    }),
    email: Joi.string().email({ tlds: false }).required().messages({
        'string.empty': "email is required",
        "any.required": "email is required",
    }),
    password: Joi.string().pattern(/^[a-zA-Z0-9]{4,}$/).required().messages({
        'string.empty': "password is required",
        "string.pattern.base": "password must be at least 6 characters and contain only alphabet and number",
        "any.required": "password is required",
    }),
    mobile: Joi.string().messages({
        'string.empty': "mobile is required",
        "any.required": "mobile is required",
    }),
});

const loginSchema = Joi.object({
    email: Joi.string().required().messages({
        "string.empty": "email is required",
        "any.required": "email is required"
    }),
    password: Joi.string().required().messages({
        "string.empty": "password is required",
        "any.required": "password is required"
    }),
})

exports.validateRegister = validate(registerSchema);
exports.validateLogin = validate(loginSchema);
