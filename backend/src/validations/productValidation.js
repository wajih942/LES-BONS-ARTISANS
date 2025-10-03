const Joi = require('joi');

const createProductSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.empty': 'Le nom est requis',
    'any.required': 'Le nom est requis'
  }),
  type: Joi.string().required().messages({
    'string.empty': 'Le type est requis',
    'any.required': 'Le type est requis'
  }),
  price: Joi.number().required().messages({
    'number.base': 'Le prix doit être un nombre',
    'any.required': 'Le prix est requis'
  }),
  rating: Joi.number().min(0).max(5).required().messages({
    'number.base': 'La note doit être un nombre',
    'number.min': 'La note doit être au moins 0',
    'number.max': 'La note ne peut pas dépasser 5',
    'any.required': 'La note est requise'
  }),
  warranty_years: Joi.number().required().messages({
    'number.base': 'La garantie doit être un nombre',
    'any.required': 'La garantie est requise'
  }),
  available: Joi.boolean().required().messages({
    'boolean.base': 'Disponible doit être vrai ou faux',
    'any.required': 'Disponible est requis'
  })
});

// ✅ Validation souple pour la mise à jour (tous optionnels mais validés si présents)
const updateProductSchema = Joi.object({
  name: Joi.string().messages({
    'string.empty': 'Le nom ne peut pas être vide'
  }),
  type: Joi.string(),
  price: Joi.number().messages({
    'number.base': 'Le prix doit être un nombre'
  }),
  rating: Joi.number().min(0).max(5).messages({
    'number.base': 'La note doit être un nombre',
    'number.min': 'La note doit être au moins 0',
    'number.max': 'La note ne peut pas dépasser 5'
  }),
  warranty_years: Joi.number().messages({
    'number.base': 'La garantie doit être un nombre'
  }),
  available: Joi.boolean().messages({
    'boolean.base': 'Disponible doit être vrai ou faux'
  })
}).min(1); // ⚠️ Oblige à envoyer au moins un champ


module.exports = { createProductSchema , updateProductSchema };
