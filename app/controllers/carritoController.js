const carritoService = require('../services/carritoService');

async function list(req, res, next) {
  try {
    const carritos = await carritoService.list();
    res.status(200).json({ carritos });
  } catch (error) {
    next(error);
  }
}

async function getById(req, res, next) {
  try {
    const carrito = await carritoService.getById(req.params.id);
    res.status(200).json({ carrito });
  } catch (error) {
    next(error);
  }
}

async function create(req, res, next) {
  try {
    const carrito = await carritoService.create(req.body);
    res.status(201).json({ carrito });
  } catch (error) {
    next(error);
  }
}

async function addItem(req, res, next) {
  try {
    const carrito = await carritoService.addItem(req.params.id, req.body);
    res.status(200).json({ carrito });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  list,
  getById,
  create,
  addItem,
};
