const { mongoose } = require('../config/database');

const pedidoItemSchema = new mongoose.Schema(
  {
    productoId: { type: String, required: true },
    cantidad: { type: Number, required: true, min: 1 },
  },
  { _id: false }
);

const pedidoSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    usuarioId: { type: String, required: true, index: true },
    carritoId: { type: String, default: null },
    items: { type: [pedidoItemSchema], default: [] },
    total: { type: Number, required: true, min: 0 },
    estado: { type: String, default: 'pendiente', trim: true },
    metodoPago: { type: String, default: 'transferencia', trim: true },
    entrega: {
      nombre: { type: String, default: '', trim: true },
      email: { type: String, default: '', trim: true },
      telefono: { type: String, default: '', trim: true },
      direccion: { type: String, default: '', trim: true },
    },
  },
  { versionKey: false, timestamps: true }
);

module.exports = mongoose.models.Pedido || mongoose.model('Pedido', pedidoSchema);
