const pedidoModel = require('../models/pedidoModel');
const carritoService = require('./carritoService');
const usuarioService = require('./usuarioService');
const { generateReadableId } = require('../utils/idGenerator');
const productoService = require('./productoService');

function createId() {
  return generateReadableId('pedido');
}

function buildValidationError(message) {
  const error = new Error(message);
  error.status = 400;
  return error;
}

function normalizeDelivery(payload) {
  const entrega = payload.entrega || {};

  return {
    nombre: entrega.nombre || '',
    email: entrega.email || '',
    telefono: entrega.telefono || '',
    direccion: entrega.direccion || '',
  };
}

async function list() {
  return pedidoModel.find({}).lean();
}

async function getById(id) {
  const order = await pedidoModel.findOne({ id }).lean();

  if (!order) {
    const error = new Error('Pedido no encontrado');
    error.status = 404;
    throw error;
  }

  return order;
}

async function createFromCart(payload) {
  if (!payload.usuarioId || !payload.carritoId) {
    throw buildValidationError('usuarioId y carritoId son obligatorios');
  }

  await usuarioService.getById(payload.usuarioId);
  const cart = await carritoService.getById(payload.carritoId);

  if (cart.items.length === 0) {
    throw buildValidationError('No se puede generar un pedido con un carrito vacio');
  }

  const total = cart.items.reduce((sum, item) => sum + item.subtotal, 0);

  return pedidoModel.create({
    id: createId(),
    usuarioId: payload.usuarioId,
    carritoId: payload.carritoId,
    items: cart.items.map((item) => ({
      productoId: item.productoId,
      cantidad: item.cantidad,
    })),
    total,
    estado: payload.estado || 'confirmado',
    metodoPago: payload.metodoPago || 'transferencia',
    entrega: normalizeDelivery(payload),
  });
}

module.exports = {
  list,
  getById,
  createFromCart,
};
