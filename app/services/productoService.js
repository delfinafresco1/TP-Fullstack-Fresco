const productoModel = require('../models/productoModel');

const VALID_CATEGORIES = ['cpu', 'motherboard', 'gpu', 'ram', 'storage', 'psu', 'case', 'cooler'];

function createId() {
  return `prod-${Date.now()}`;
}

function buildValidationError(message) {
  const error = new Error(message);
  error.status = 400;
  return error;
}

async function list(filters) {
  const normalizedFilters = {
    categoria: filters.categoria,
    marca: filters.marca,
  };

  const query = {};

  if (normalizedFilters.categoria) {
    query.categoria = normalizedFilters.categoria;
  }

  if (normalizedFilters.marca) {
    query.marca = new RegExp(`^${normalizedFilters.marca}$`, 'i');
  }

  return productoModel.find(query).lean();
}

async function getById(id) {
  const product = await productoModel.findOne({ id }).lean();

  if (!product) {
    const error = new Error('Producto no encontrado');
    error.status = 404;
    throw error;
  }

  return product;
}

function validatePayload(payload, partial = false) {
  const requiredFields = ['nombre', 'categoria', 'marca', 'precio', 'stock'];

  if (!partial) {
    requiredFields.forEach((field) => {
      if (payload[field] === undefined || payload[field] === null || payload[field] === '') {
        throw buildValidationError(`El campo "${field}" es obligatorio`);
      }
    });
  }

  if (payload.categoria && !VALID_CATEGORIES.includes(payload.categoria)) {
    throw buildValidationError(`La categoria debe ser una de: ${VALID_CATEGORIES.join(', ')}`);
  }

  if (payload.precio !== undefined && Number(payload.precio) <= 0) {
    throw buildValidationError('El precio debe ser mayor que cero');
  }

  if (payload.stock !== undefined && Number(payload.stock) < 0) {
    throw buildValidationError('El stock no puede ser negativo');
  }
}

async function create(payload) {
  validatePayload(payload);

  return productoModel.create({
    id: createId(),
    nombre: payload.nombre,
    categoria: payload.categoria,
    marca: payload.marca,
    socket: payload.socket || null,
    precio: Number(payload.precio),
    stock: Number(payload.stock),
    consumoWatts: Number(payload.consumoWatts || 0),
    potenciaSalida: payload.potenciaSalida ? Number(payload.potenciaSalida) : null,
  });
}

async function update(id, payload) {
  validatePayload(payload, true);
  await getById(id);

  await productoModel.updateOne(
    { id },
    {
      $set: {
        ...payload,
        precio: payload.precio !== undefined ? Number(payload.precio) : undefined,
        stock: payload.stock !== undefined ? Number(payload.stock) : undefined,
        consumoWatts:
          payload.consumoWatts !== undefined ? Number(payload.consumoWatts) : undefined,
        potenciaSalida:
          payload.potenciaSalida !== undefined ? Number(payload.potenciaSalida) : undefined,
      },
    }
  );

  return getById(id);
}

async function remove(id) {
  const product = await getById(id);
  await productoModel.deleteOne({ id });
  return product;
}

module.exports = {
  list,
  getById,
  create,
  update,
  remove,
  VALID_CATEGORIES,
};
