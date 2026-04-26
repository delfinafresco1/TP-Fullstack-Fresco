const carritoModel = require('../models/carritoModel');
const usuarioService = require('./usuarioService');
const productoService = require('./productoService');
const armadoService = require('./armadoService');

function createId() {
  return `cart-${Date.now()}`;
}

function buildValidationError(message) {
  const error = new Error(message);
  error.status = 400;
  return error;
}

async function hydrateCart(cart) {
  const cartData = typeof cart.toObject === 'function' ? cart.toObject() : cart;
  const items = await Promise.all(
    cartData.items.map(async (item) => {
      const producto = await productoService.getById(item.productoId);
      return {
        ...item,
        producto,
        subtotal: producto.precio * item.cantidad,
      };
    })
  );

  const total = items.reduce((sum, item) => sum + item.subtotal, 0);
  const armado = cartData.buildId ? await armadoService.getById(cartData.buildId) : null;

  return {
    ...cartData,
    items,
    armado,
    total,
  };
}

async function list() {
  const carts = await carritoModel.find({}).lean();
  return Promise.all(carts.map(hydrateCart));
}

async function getById(id) {
  const cart = await carritoModel.findOne({ id }).lean();

  if (!cart) {
    const error = new Error('Carrito no encontrado');
    error.status = 404;
    throw error;
  }

  return hydrateCart(cart);
}

async function create(payload) {
  if (!payload.usuarioId) {
    throw buildValidationError('usuarioId es obligatorio');
  }

  await usuarioService.getById(payload.usuarioId);

  if (payload.buildId) {
    await armadoService.getById(payload.buildId);
  }

  const cart = await carritoModel.create({
    id: createId(),
    usuarioId: payload.usuarioId,
    items: Array.isArray(payload.items) ? payload.items : [],
    buildId: payload.buildId || null,
  });

  return hydrateCart(cart);
}

async function addItem(id, payload) {
  if (!payload.productoId || !payload.cantidad) {
    throw buildValidationError('productoId y cantidad son obligatorios');
  }

  const product = await productoService.getById(payload.productoId);

  if (payload.cantidad <= 0) {
    throw buildValidationError('La cantidad debe ser mayor que cero');
  }

  if (product.stock < payload.cantidad) {
    throw buildValidationError('No hay stock suficiente para la cantidad solicitada');
  }

  const current = await carritoModel.findOne({ id });

  if (!current) {
    const error = new Error('Carrito no encontrado');
    error.status = 404;
    throw error;
  }

  const existingItem = current.items.find((item) => item.productoId === payload.productoId);

  if (existingItem) {
    existingItem.cantidad += Number(payload.cantidad);
  } else {
    current.items.push({
      productoId: payload.productoId,
      cantidad: Number(payload.cantidad),
    });
  }

  await current.save();
  return getById(id);
}

module.exports = {
  list,
  getById,
  create,
  addItem,
};
