const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { API_PREFIX } = require('./config/config');
const openApiSpec = require('./docs/openapi');

const productosRouter = require('./routes/productos');
const usuariosRouter = require('./routes/usuarios');
const authRouter = require('./routes/auth');
const armadosRouter = require('./routes/armados');
const carritosRouter = require('./routes/carritos');
const pedidosRouter = require('./routes/pedidos');

const app = express();
const frontendPath = path.join(__dirname, '..', 'frontend');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(frontendPath));

app.get('/', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

app.get('/docs', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'docs.html'));
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.get('/api-docs/openapi.json', (req, res) => {
  res.status(200).json(openApiSpec);
});

app.use(`${API_PREFIX}/auth`, authRouter);
app.use(`${API_PREFIX}/productos`, productosRouter);
app.use(`${API_PREFIX}/usuarios`, usuariosRouter);
app.use(`${API_PREFIX}/armados`, armadosRouter);
app.use(`${API_PREFIX}/carritos`, carritosRouter);
app.use(`${API_PREFIX}/pedidos`, pedidosRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Endpoint no encontrado' });
});

app.use((error, req, res, next) => {
  const status = error.status || 500;
  res.status(status).json({
    message: error.message || 'Error interno del servidor',
  });
});

module.exports = app;
