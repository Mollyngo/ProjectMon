import Joi from "joi";
import validate from "./validate";

const registerSchema = Joi.object({
    first_name: Joi.string().trim().messages({
        'string.empty': 'first name is required'
    }),
    last_name: Joi.string().trim().messages({
        'string.empty': 'last name is required'
    }),
    email: Joi.string().email({ tlds: false }).messages({
        'alternatives.match': 'invalid email address ',
        'any.required': 'email is required'
    }),
    password: Joi.string()
        .pattern(/[a-zA-Z0-9]{3,30}$/)
        .required()
        .messages({
            "string.pattern.base": `Password should be between 3 to 30 characters and contain letters or numbers only`,
            "string.empty": `Password cannot be empty`,
            "any.required": `Password is required`,
        }),
    mobile: Joi.string().messages({
        'string.empty': "mobile is required"
    }),

});

const validateRegister = input => {
    console.log(input)
    const a = validate(registerSchema, input)
    console.log(a, "AAAAA")
    return a
}

export default validateRegister