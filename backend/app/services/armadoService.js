const armadoModel = require('../models/armadoModel');
const usuarioService = require('./usuarioService');
const productoService = require('./productoService');
const { generateReadableId } = require('../utils/idGenerator');

const REQUIRED_CATEGORIES = ['cpu', 'motherboard', 'ram', 'storage', 'psu', 'case'];

function createId() {
  return generateReadableId('armado');
}

function buildValidationError(message) {
  const error = new Error(message);
  error.status = 400;
  return error;
}

async function hydrateBuild(build) {
  const buildData = typeof build.toObject === 'function' ? build.toObject() : build;
  const components = await Promise.all(buildData.componentes.map((id) => productoService.getById(id)));
  const total = components.reduce((sum, component) => sum + component.precio, 0);
  const consumoTotal = components.reduce((sum, component) => sum + component.consumoWatts, 0);
  const fuente = components.find((component) => component.categoria === 'psu');
  const faltantes = REQUIRED_CATEGORIES.filter(
    (category) => !components.some((component) => component.categoria === category)
  );
  const cpu = components.find((component) => component.categoria === 'cpu');
  const motherboard = components.find((component) => component.categoria === 'motherboard');
  const socketCompatible = !cpu || !motherboard || cpu.socket === motherboard.socket;
  const wattsDisponibles = fuente ? fuente.potenciaSalida || 0 : 0;

  return {
    ...buildData,
    detalleComponentes: components,
    resumen: {
      total,
      consumoTotal,
      wattsDisponibles,
      componentesMinimosCompletos: faltantes.length === 0,
      categoriasFaltantes: faltantes,
      socketCompatible,
      margenFuente: wattsDisponibles - consumoTotal,
    },
  };
}

async function list() {
  const builds = await armadoModel.find({}).lean();
  return Promise.all(builds.map(hydrateBuild));
}

async function getById(id) {
  const build = await armadoModel.findOne({ id }).lean();

  if (!build) {
    const error = new Error('Armado no encontrado');
    error.status = 404;
    throw error;
  }

  return hydrateBuild(build);
}

function validatePayload(payload) {
  if (!payload.nombre) {
    throw buildValidationError('El nombre del armado es obligatorio');
  }

  if (!payload.usuarioId) {
    throw buildValidationError('El usuarioId es obligatorio');
  }

  if (!Array.isArray(payload.componentes) || payload.componentes.length === 0) {
    throw buildValidationError('Debe enviar un array de componentes');
  }
}

async function create(payload) {
  validatePayload(payload);
  await usuarioService.getById(payload.usuarioId);

  await Promise.all(payload.componentes.map((componentId) => productoService.getById(componentId)));

  const build = await armadoModel.create({
    id: createId(),
    nombre: payload.nombre,
    usuarioId: payload.usuarioId,
    componentes: payload.componentes,
    estado: payload.estado || 'borrador',
  });

  return hydrateBuild(build);
}

async function update(id, payload) {
  const current = await armadoModel.findOne({ id }).lean();

  if (!current) {
    const error = new Error('Armado no encontrado');
    error.status = 404;
    throw error;
  }

  if (payload.usuarioId) {
    await usuarioService.getById(payload.usuarioId);
  }

  if (payload.componentes) {
    if (!Array.isArray(payload.componentes) || payload.componentes.length === 0) {
      throw buildValidationError('componentes debe ser un array con al menos un item');
    }

    await Promise.all(payload.componentes.map((componentId) => productoService.getById(componentId)));
  }

  await armadoModel.updateOne(
    { id },
    {
      $set: {
        nombre: payload.nombre,
        usuarioId: payload.usuarioId,
        componentes: payload.componentes,
        estado: payload.estado,
      },
    }
  );

  return getById(id);
}

async function remove(id) {
  const build = await getById(id);
  await armadoModel.deleteOne({ id });
  return build;
}

module.exports = {
  list,
  getById,
  create,
  update,
  remove,
  REQUIRED_CATEGORIES,
};
