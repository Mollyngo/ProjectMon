const Joi = require('joi');
const validate = require('./validate');

const targetUserIdSchema = Joi.object({
    targetUserId: Joi.number().positive().required()
});

exports.validateTargetUserId = (req, res, next) => {
    const { value, error } = targetUserIdSchema.validate(req.params);
    console.log(value, "validar")
    if (error) {
        throw error;
    }
    req.targetUserId = value.targetUserId;
    next();
}