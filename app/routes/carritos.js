const express = require('express');
const carritoController = require('../controllers/carritoController');

const router = express.Router();

router.get('/', carritoController.list);
router.get('/:id', carritoController.getById);
router.post('/', carritoController.create);
router.post('/:id/items', carritoController.addItem);

module.exports = router;
