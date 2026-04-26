const { mongoose } = require('../config/database');

const productoSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    nombre: { type: String, required: true, trim: true },
    categoria: {
      type: String,
      required: true,
      enum: ['cpu', 'motherboard', 'gpu', 'ram', 'storage', 'psu', 'case', 'cooler'],
    },
    marca: { type: String, required: true, trim: true },
    socket: { type: String, default: null },
    precio: { type: Number, required: true, min: 1 },
    stock: { type: Number, required: true, min: 0 },
    consumoWatts: { type: Number, default: 0, min: 0 },
    potenciaSalida: { type: Number, default: null, min: 0 },
  },
  { versionKey: false, timestamps: true }
);

module.exports = mongoose.models.Producto || mongoose.model('Producto', productoSchema);
