const { mongoose } = require('../config/database');

const armadoSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    nombre: { type: String, required: true, trim: true },
    usuarioId: { type: String, required: true, index: true },
    componentes: [{ type: String, required: true }],
    estado: { type: String, default: 'borrador', trim: true },
  },
  { versionKey: false, timestamps: true }
);

module.exports = mongoose.models.Armado || mongoose.model('Armado', armadoSchema);
