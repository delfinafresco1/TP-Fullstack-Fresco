const pedidoService = require('../services/pedidoService');

async function list(req, res, next) {
  try {
    const pedidos = await pedidoService.list();
    res.status(200).json({ pedidos });
  } catch (error) {
    next(error);
  }
}

async function getById(req, res, next) {
  try {
    const pedido = await pedidoService.getById(req.params.id);
    res.status(200).json({ pedido });
  } catch (error) {
    next(error);
  }
}

async function create(req, res, next) {
  try {
    const pedido = await pedidoService.createFromCart(req.body);
    res.status(201).json({ pedido });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  list,
  getById,
  create,
};
