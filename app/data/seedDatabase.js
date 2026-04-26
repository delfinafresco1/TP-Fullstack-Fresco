const Producto = require('../models/productoModel');
const Usuario = require('../models/usuarioModel');
const Armado = require('../models/armadoModel');
const Carrito = require('../models/carritoModel');
const Pedido = require('../models/pedidoModel');
const seed = require('./seed');

async function seedIfNeeded() {
  const productsCount = await Producto.countDocuments();

  if (productsCount > 0) {
    return;
  }

  await Producto.insertMany(seed.products);
  await Usuario.insertMany(seed.users);
  await Armado.insertMany(seed.builds);
  await Carrito.insertMany(seed.carts);
  await Pedido.insertMany(seed.orders);

  console.log('Datos semilla insertados en MongoDB');
}

module.exports = {
  seedIfNeeded,
};
