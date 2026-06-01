const { mongoose } = require('../config/database');

const carritoItemSchema = new mongoose.Schema(
  {
    productoId: { type: String, required: true },
    cantidad: { type: Number, required: true, min: 1 },
  },
  { _id: false }
);

const carritoSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    usuarioId: { type: String, required: true, index: true },
    items: { type: [carritoItemSchema], default: [] },
    buildId: { type: String, default: null },
  },
  { versionKey: false, timestamps: true }
);

module.exports = mongoose.models.Carrito || mongoose.model('Carrito', carritoSchema);
