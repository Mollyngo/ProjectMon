import joi from "joi";
import validate from "./validate";

const registerSchema = joi.object({
    email: joi.string().required().email({ tlds: false }).message("กรุณากรอกอีเมล์"),
    password: joi
        .string()
        .required()
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .message("กรุณากรอกรหัสผ่าน"),

    firstName: joi.string().required().trim().message("กรุณากรอกชื่อ"),
    lastName: joi.string().required().trim().message("กรุณากรอกนามสกุล"),

});

const validateRegister = input => validate(registerSchema, input)

export default validateRegister