const productoService = require('../services/productoService');

async function list(req, res, next) {
  try {
    const productos = await productoService.list(req.query);
    res.status(200).json({ productos });
  } catch (error) {
    next(error);
  }
}

async function getById(req, res, next) {
  try {
    const producto = await productoService.getById(req.params.id);
    res.status(200).json({ producto });
  } catch (error) {
    next(error);
  }
}

async function create(req, res, next) {
  try {
    const producto = await productoService.create(req.body);
    res.status(201).json({ producto });
  } catch (error) {
    next(error);
  }
}

async function update(req, res, next) {
  try {
    const producto = await productoService.update(req.params.id, req.body);
    res.status(200).json({ producto });
  } catch (error) {
    next(error);
  }
}

async function remove(req, res, next) {
  try {
    const producto = await productoService.remove(req.params.id);
    res.status(200).json({ producto, message: 'Producto eliminado' });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  list,
  getById,
  create,
  update,
  remove,
};
