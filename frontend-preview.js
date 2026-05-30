const express = require('express');
const path = require('path');
const seed = require('./app/data/seed');

const app = express();
const PORT = process.env.PREVIEW_PORT || 5177;
let products = seed.products.map((product) => ({ ...product }));
let users = seed.users.map((user) => ({ ...user, email: user.email.toLowerCase() }));

app.use(express.json());
app.use(express.static(path.join(__dirname, 'frontend')));

app.get('/api/productos', (req, res) => {
  res.status(200).json({ productos: products });
});

app.post('/api/productos', (req, res) => {
  const product = {
    id: `producto-preview-${Date.now()}`,
    nombre: req.body.nombre,
    categoria: req.body.categoria,
    marca: req.body.marca,
    socket: req.body.socket || null,
    precio: Number(req.body.precio),
    stock: Number(req.body.stock),
    consumoWatts: Number(req.body.consumoWatts || 0),
    potenciaSalida: req.body.potenciaSalida ? Number(req.body.potenciaSalida) : null,
  };
  products.push(product);
  res.status(201).json({ producto: product });
});

app.put('/api/productos/:id', (req, res) => {
  const index = products.findIndex((product) => product.id === req.params.id);
  if (index === -1) {
    res.status(404).json({ message: 'Producto no encontrado' });
    return;
  }

  products[index] = {
    ...products[index],
    ...req.body,
    precio: Number(req.body.precio),
    stock: Number(req.body.stock),
    consumoWatts: Number(req.body.consumoWatts || 0),
    potenciaSalida: req.body.potenciaSalida ? Number(req.body.potenciaSalida) : null,
  };
  res.status(200).json({ producto: products[index] });
});

app.delete('/api/productos/:id', (req, res) => {
  const product = products.find((item) => item.id === req.params.id);
  products = products.filter((item) => item.id !== req.params.id);
  res.status(200).json({ producto: product, message: 'Producto eliminado' });
});

app.post('/api/auth/login', (req, res) => {
  const user = users.find((item) => item.email === String(req.body.email || '').toLowerCase());

  if (!user || user.password !== req.body.password) {
    res.status(401).json({ message: 'Credenciales invalidas' });
    return;
  }

  res.status(200).json({
    token: 'preview-token',
    usuario: {
      id: user.id,
      nombre: user.nombre,
      email: user.email,
      presupuestoMaximo: user.presupuestoMaximo,
      perfil: user.perfil,
    },
  });
});

app.post('/api/usuarios', (req, res) => {
  if (users.some((user) => user.email === String(req.body.email || '').toLowerCase())) {
    res.status(400).json({ message: 'Ya existe un usuario con ese email' });
    return;
  }

  const user = {
    id: `usuario-preview-${Date.now()}`,
    nombre: req.body.nombre,
    email: String(req.body.email || '').toLowerCase(),
    password: req.body.password,
    presupuestoMaximo: Number(req.body.presupuestoMaximo || 0),
    perfil: req.body.perfil || 'general',
  };
  users.push(user);
  res.status(201).json({ usuario: user });
});

app.post('/api/carritos', (req, res) => {
  res.status(201).json({
    carrito: {
      id: 'carrito-preview',
      usuarioId: req.body.usuarioId,
      items: req.body.items || [],
    },
  });
});

app.post('/api/pedidos', (req, res) => {
  res.status(201).json({
    pedido: {
      id: 'pedido-preview',
      usuarioId: req.body.usuarioId,
      carritoId: req.body.carritoId,
      estado: 'confirmado',
      metodoPago: req.body.metodoPago || 'transferencia',
      entrega: req.body.entrega || {},
    },
  });
});

app.listen(PORT, () => {
  console.log(`Frontend preview disponible en http://localhost:${PORT}`);
});
