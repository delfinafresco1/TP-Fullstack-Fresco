const products = [
  {
    id: 'prod-1',
    nombre: 'AMD Ryzen 7 7800X3D',
    categoria: 'cpu',
    marca: 'AMD',
    socket: 'AM5',
    precio: 520000,
    stock: 8,
    consumoWatts: 120,
  },
  {
    id: 'prod-2',
    nombre: 'Motherboard ASUS TUF B650-PLUS WIFI',
    categoria: 'motherboard',
    marca: 'ASUS',
    socket: 'AM5',
    precio: 310000,
    stock: 6,
    consumoWatts: 70,
  },
  {
    id: 'prod-3',
    nombre: 'NVIDIA RTX 4070 Super 12GB',
    categoria: 'gpu',
    marca: 'NVIDIA',
    precio: 890000,
    stock: 5,
    consumoWatts: 220,
  },
  {
    id: 'prod-4',
    nombre: 'Kingston Fury Beast 32GB DDR5',
    categoria: 'ram',
    marca: 'Kingston',
    precio: 165000,
    stock: 15,
    consumoWatts: 10,
  },
  {
    id: 'prod-5',
    nombre: 'SSD NVMe Samsung 980 Pro 1TB',
    categoria: 'storage',
    marca: 'Samsung',
    precio: 140000,
    stock: 10,
    consumoWatts: 8,
  },
  {
    id: 'prod-6',
    nombre: 'Corsair RM750e 750W 80 Plus Gold',
    categoria: 'psu',
    marca: 'Corsair',
    precio: 185000,
    stock: 9,
    consumoWatts: 0,
    potenciaSalida: 750,
  },
  {
    id: 'prod-7',
    nombre: 'Gabinete NZXT H6 Flow',
    categoria: 'case',
    marca: 'NZXT',
    precio: 170000,
    stock: 4,
    consumoWatts: 0,
  },
  {
    id: 'prod-8',
    nombre: 'Cooler DeepCool AK620',
    categoria: 'cooler',
    marca: 'DeepCool',
    precio: 115000,
    stock: 7,
    consumoWatts: 6,
  },
];

const users = [
  {
    id: 'usr-1',
    nombre: 'Lucia Fernandez',
    email: 'lucia@fresco.dev',
    presupuestoMaximo: 2500000,
    perfil: 'gaming',
  },
  {
    id: 'usr-2',
    nombre: 'Martin Gomez',
    email: 'martin@fresco.dev',
    presupuestoMaximo: 1800000,
    perfil: 'streaming',
  },
];

const builds = [
  {
    id: 'build-1',
    nombre: 'Gaming AM5 1440p',
    usuarioId: 'usr-1',
    componentes: ['prod-1', 'prod-2', 'prod-3', 'prod-4', 'prod-5', 'prod-6', 'prod-7', 'prod-8'],
    estado: 'borrador',
  },
];

const carts = [
  {
    id: 'cart-1',
    usuarioId: 'usr-1',
    items: [
      { productoId: 'prod-3', cantidad: 1 },
      { productoId: 'prod-5', cantidad: 1 },
    ],
    buildId: 'build-1',
  },
];

const orders = [
  {
    id: 'ord-1',
    usuarioId: 'usr-2',
    carritoId: null,
    items: [{ productoId: 'prod-4', cantidad: 2 }],
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
