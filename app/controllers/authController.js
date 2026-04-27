const authService = require('../services/authService');

async function login(req, res, next) {
  try {
    const resultado = await authService.login(req.body);
    res.status(200).json(resultado);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  login,
};
