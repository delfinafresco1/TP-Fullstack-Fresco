const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const usuarioService = require('./usuarioService');
const { JWT_SECRET } = require('../config/config');

function buildValidationError(message) {
  const error = new Error(message);
  error.status = 400;
  return error;
}

async function login(payload) {
  if (!payload.email || !payload.password) {
    throw buildValidationError('email y password son obligatorios');
  }

  const user = await usuarioService.getByEmailWithPassword(payload.email);

  if (!user) {
    const error = new Error('Credenciales invalidas');
    error.status = 401;
    throw error;
  }

  const isValidPassword = await bcrypt.compare(payload.password, user.passwordHash);

  if (!isValidPassword) {
    const error = new Error('Credenciales invalidas');
    error.status = 401;
    throw error;
  }

  const token = jwt.sign(
    {
      sub: user.id,
      email: user.email,
      perfil: user.perfil,
    },
    JWT_SECRET,
    { expiresIn: '2h' }
  );

  return {
    token,
    usuario: {
      id: user.id,
      nombre: user.nombre,
      email: user.email,
      presupuestoMaximo: user.presupuestoMaximo,
      perfil: user.perfil,
    },
  };
}

module.exports = {
  login,
};
