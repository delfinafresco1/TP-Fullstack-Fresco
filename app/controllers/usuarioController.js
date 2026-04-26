const usuarioService = require('../services/usuarioService');

async function list(req, res, next) {
  try {
    const usuarios = await usuarioService.list();
    res.status(200).json({ usuarios });
  } catch (error) {
    next(error);
  }
}

async function getById(req, res, next) {
  try {
    const usuario = await usuarioService.getById(req.params.id);
    res.status(200).json({ usuario });
  } catch (error) {
    next(error);
  }
}

async function create(req, res, next) {
  try {
    const usuario = await usuarioService.create(req.body);
    res.status(201).json({ usuario });
  } catch (error) {
    next(error);
  }
}

async function update(req, res, next) {
  try {
    const usuario = await usuarioService.update(req.params.id, req.body);
    res.status(200).json({ usuario });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  list,
  getById,
  create,
  update,
};
