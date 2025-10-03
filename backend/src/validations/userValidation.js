const Joi = require('joi');

const createUserSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Email invalide',
    'any.required': 'Email est requis'
  }),
  name: Joi.string().min(3).required().messages({
    'string.min': 'Le nom doit contenir au moins 3 caractères',
    'any.required': 'Le nom est requis'
  }),
  password: Joi.string()
    .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{5,}$'))
    .required()
    .messages({
      'string.pattern.base': 'Le mot de passe doit contenir au moins 5 caractères, incluant une majuscule, une minuscule, un chiffre et un caractère spécial (@$!%*?&)',
      'any.required': 'Le mot de passe est requis'
    })
});

// ✅ Update schema (fields optional but validated if present)
const updateUserSchema = Joi.object({
  email: Joi.string().email().messages({
    'string.email': 'Email invalide'
  }),
  name: Joi.string().min(3).messages({
    'string.min': 'Le nom doit contenir au moins 3 caractères'
  }),
  password: Joi.string()
    .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{5,}$'))
    .messages({
      'string.pattern.base': 'Le mot de passe doit contenir au moins 5 caractères, incluant une majuscule, une minuscule, un chiffre et un caractère spécial (@$!%*?&)'
    })
}).min(1); // ⚠️ At least one field must be provided
  

module.exports = { createUserSchema, updateUserSchema };
