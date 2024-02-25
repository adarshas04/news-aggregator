const Joi = require("joi");

const registrationSchema = Joi.object({
  name: Joi.string().required(),
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  newsPreferences: Joi.array().items(Joi.string()).required()
});

const loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required()
});

const preferenceSchema = Joi.object({
  newsPreferences: Joi.array().items(Joi.string()).required()
});

const validateParams = (schema, statusCode) => async (req, res, next) => {
  try {
    await schema.validateAsync(req.body);
    next();
  } catch (error) {
    res.status(statusCode).json({ error: error.details.map((d) => d.message) });
  }
};

const validateRegistrationParams = validateParams(registrationSchema, 400);
const validateLoginParams = validateParams(loginSchema, 401);
const validatePreferenceParam = validateParams(preferenceSchema, 400);

module.exports = { validateLoginParams, validateRegistrationParams, validatePreferenceParam };