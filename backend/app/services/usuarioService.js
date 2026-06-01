const bcrypt = require('bcryptjs');
const usuarioModel = require('../models/usuarioModel');
const { generateReadableId } = require('../utils/idGenerator');

function createId() {
  return generateReadableId('usuario');
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
  const requiredFields = ['nombre', 'email', 'password'];

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

  if (payload.password !== undefined && String(payload.password).length < 6) {
    throw buildValidationError('La password debe tener al menos 6 caracteres');
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
    email: payload.email.toLowerCase(),
    passwordHash: await bcrypt.hash(payload.password, 10),
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
        nombre: payload.nombre,
        email: payload.email ? payload.email.toLowerCase() : undefined,
        passwordHash: payload.password ? await bcrypt.hash(payload.password, 10) : undefined,
        perfil: payload.perfil,
        presupuestoMaximo:
          payload.presupuestoMaximo !== undefined ? Number(payload.presupuestoMaximo) : undefined,
      },
    }
  );

  return getById(id);
}

async function remove(id) {
  const user = await getById(id);
  await usuarioModel.deleteOne({ id });
  return user;
}

async function getByEmailWithPassword(email) {
  return usuarioModel.findOne({ email: email.toLowerCase() }).select('+passwordHash').lean();
}

module.exports = {
  list,
  getById,
  getByEmailWithPassword,
  create,
  update,
  remove,
};
