const products = [
  {
    id: 'producto-1',
    nombre: 'Procesador Gamer AMD',
    categoria: 'cpu',
    marca: 'AMD',
    socket: 'AM5',
    precio: 520000,
    stock: 8,
    consumoWatts: 120,
  },
  {
    id: 'producto-2',
    nombre: 'Placa Madre AM5 ASUS',
    categoria: 'motherboard',
    marca: 'ASUS',
    socket: 'AM5',
    precio: 310000,
    stock: 6,
    consumoWatts: 70,
  },
  {
    id: 'producto-3',
    nombre: 'Placa de Video RTX 4070',
    categoria: 'gpu',
    marca: 'NVIDIA',
    precio: 890000,
    stock: 5,
    consumoWatts: 220,
  },
  {
    id: 'producto-4',
    nombre: 'Memoria RAM 32GB DDR5',
    categoria: 'ram',
    marca: 'Kingston',
    precio: 165000,
    stock: 15,
    consumoWatts: 10,
  },
  {
    id: 'producto-5',
    nombre: 'Disco SSD 1TB',
    categoria: 'storage',
    marca: 'Samsung',
    precio: 140000,
    stock: 10,
    consumoWatts: 8,
  },
  {
    id: 'producto-6',
    nombre: 'Fuente 750W',
    categoria: 'psu',
    marca: 'Corsair',
    precio: 185000,
    stock: 9,
    consumoWatts: 0,
    potenciaSalida: 750,
  },
  {
    id: 'producto-7',
    nombre: 'Gabinete Mid Tower',
    categoria: 'case',
    marca: 'NZXT',
    precio: 170000,
    stock: 4,
    consumoWatts: 0,
  },
  {
    id: 'producto-8',
    nombre: 'Cooler para CPU',
    categoria: 'cooler',
    marca: 'DeepCool',
    precio: 115000,
    stock: 7,
    consumoWatts: 6,
  },
];

const users = [
  {
    id: 'usuario-1',
    nombre: 'Lucia Fernandez',
    email: 'lucia@fresco.dev',
    password: 'Fullstack123',
    presupuestoMaximo: 2500000,
    perfil: 'gaming',
  },
  {
    id: 'usuario-2',
    nombre: 'Martin Gomez',
    email: 'martin@fresco.dev',
    password: 'Fullstack123',
    presupuestoMaximo: 1800000,
    perfil: 'streaming',
  },
];

const builds = [
  {
    id: 'armado-1',
    nombre: 'PC Gamer Base',
    usuarioId: 'usuario-1',
    componentes: [
      'producto-1',
      'producto-2',
      'producto-3',
      'producto-4',
      'producto-5',
      'producto-6',
      'producto-7',
      'producto-8'
    ],
    estado: 'borrador',
  },
];

const carts = [
  {
    id: 'carrito-1',
    usuarioId: 'usuario-1',
    items: [
      { productoId: 'producto-3', cantidad: 1 },
      { productoId: 'producto-5', cantidad: 1 },
    ],
    buildId: 'armado-1',
  },
];

const orders = [
  {
    id: 'pedido-1',
    usuarioId: 'usuario-2',
    carritoId: null,
    items: [{ productoId: 'producto-4', cantidad: 2 }],
    total: 330000,
    estado: 'confirmado',
  },
];

module.exports = {
  products,
  users,
  builds,
  carts,
  orders,
};
