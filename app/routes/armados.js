const express = require('express');
const armadoController = require('../controllers/armadoController');

const router = express.Router();

router.get('/', armadoController.list);
router.get('/:id', armadoController.getById);
router.post('/', armadoController.create);
router.put('/:id', armadoController.update);

module.exports = router;
