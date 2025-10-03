const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/productsController');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate')
const { createProductSchema , updateProductSchema } = require('../validations/productValidation');


router.get('/', ctrl.listProducts);
router.get('/me', auth.requireAuth, ctrl.getMyProducts);
router.get('/:id', ctrl.getProduct);


router.post('/', validate(createProductSchema), auth.requireAuth, ctrl.createProduct);
router.put('/:id',validate(updateProductSchema), auth.requireAuth, ctrl.updateProduct);
router.delete('/:id', auth.requireAuth, ctrl.deleteProduct);

module.exports = router;