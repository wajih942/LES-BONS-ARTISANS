const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/userController');
const validate = require('../middleware/validate');
const { createUserSchema } = require('../validations/userValidation');
router.post('/register', validate(createUserSchema), userCtrl.register);
router.post('/login', userCtrl.login);

module.exports = router;
