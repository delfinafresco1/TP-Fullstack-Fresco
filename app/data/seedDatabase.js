const bcrypt = require('bcryptjs');
const Producto = require('../models/productoModel');
const Usuario = require('../models/usuarioModel');
const Armado = require('../models/armadoModel');
const Carrito = require('../models/carritoModel');
const Pedido = require('../models/pedidoModel');
const seed = require('./seed');

function mapSeedUsers() {
  return seed.users.map((user) => ({
    id: user.id,
    nombre: user.nombre,
    email: user.email.toLowerCase(),
    passwordHash: bcrypt.hashSync(user.password, 10),
    presupuestoMaximo: user.presupuestoMaximo,
    perfil: user.perfil,
  }));
}

async function seedIfNeeded() {
  const productsCount = await Producto.countDocuments();

  if (productsCount > 0) {
    for (const user of mapSeedUsers()) {
      await Usuario.updateOne(
        { email: user.email },
        {
          $set: {
            passwordHash: user.passwordHash,
          },
        }
      );
    }
    return;
  }

  await Producto.insertMany(seed.products);
  await Usuario.insertMany(mapSeedUsers());
  await Armado.insertMany(seed.builds);
  await Carrito.insertMany(seed.carts);
  await Pedido.insertMany(seed.orders);

  console.log('Datos semilla insertados en MongoDB');
}

module.exports = {
  seedIfNeeded,
};
