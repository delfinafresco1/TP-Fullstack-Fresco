const express = require('express');
const pedidoController = require('../controllers/pedidoController');

const router = express.Router();

router.get('/', pedidoController.list);
router.get('/:id', pedidoController.getById);
router.post('/', pedidoController.create);

module.exports = router;
