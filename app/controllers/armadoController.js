const armadoService = require('../services/armadoService');

async function list(req, res, next) {
  try {
    const armados = await armadoService.list();
    res.status(200).json({ armados });
  } catch (error) {
    next(error);
  }
}

async function getById(req, res, next) {
  try {
    const armado = await armadoService.getById(req.params.id);
    res.status(200).json({ armado });
  } catch (error) {
    next(error);
  }
}

async function create(req, res, next) {
  try {
    const armado = await armadoService.create(req.body);
    res.status(201).json({ armado });
  } catch (error) {
    next(error);
  }
}

async function update(req, res, next) {
  try {
    const armado = await armadoService.update(req.params.id, req.body);
    res.status(200).json({ armado });
  } catch (error) {
    next(error);
  }
}

async function remove(req, res, next) {
  try {
    const armado = await armadoService.remove(req.params.id);
    res.status(200).json({ armado, message: 'Armado eliminado' });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  list,
  getById,
  create,
  update,
  remove,
};
