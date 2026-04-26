const usuarioModel = require('../models/usuarioModel');

function createId() {
  return `usr-${Date.now()}`;
}

function buildValidationError(message) {
  const error = new Error(message);
  error.status = 400;
  return error;
}

async function list() {
  return usuarioModel.find({}).lean();
}

async function getById(id) {
  const user = await usuarioModel.findOne({ id }).lean();

  if (!user) {
    const error = new Error('Usuario no encontrado');
    error.status = 404;
    throw error;
  }

  return user;
}

function validatePayload(payload, partial = false) {
  const requiredFields = ['nombre', 'email'];

  if (!partial) {
    requiredFields.forEach((field) => {
      if (!payload[field]) {
        throw buildValidationError(`El campo "${field}" es obligatorio`);
      }
    });
  }

  if (payload.email && !payload.email.includes('@')) {
    throw buildValidationError('El email no es valido');
  }
}

async function create(payload) {
  validatePayload(payload);

  if (await usuarioModel.findOne({ email: payload.email.toLowerCase() }).lean()) {
    throw buildValidationError('Ya existe un usuario con ese email');
  }

  return usuarioModel.create({
    id: createId(),
    nombre: payload.nombre,
    email: payload.email,
    presupuestoMaximo: Number(payload.presupuestoMaximo || 0),
    perfil: payload.perfil || 'general',
  });
}

async function update(id, payload) {
  validatePayload(payload, true);
  await getById(id);

  if (payload.email) {
    const existing = await usuarioModel.findOne({ email: payload.email.toLowerCase() }).lean();
    if (existing && existing.id !== id) {
      throw buildValidationError('Ya existe un usuario con ese email');
    }
  }

  await usuarioModel.updateOne(
    { id },
    {
      $set: {
        ...payload,
        email: payload.email ? payload.email.toLowerCase() : undefined,
        presupuestoMaximo:
          payload.presupuestoMaximo !== undefined ? Number(payload.presupuestoMaximo) : undefined,
      },
    }
  );

  return getById(id);
}

module.exports = {
  list,
  getById,
  create,
  update,
};
