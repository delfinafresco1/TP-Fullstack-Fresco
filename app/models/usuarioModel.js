const { mongoose } = require('../config/database');

const usuarioSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    nombre: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    passwordHash: { type: String, required: true, select: false },
    presupuestoMaximo: { type: Number, default: 0, min: 0 },
    perfil: { type: String, default: 'general', trim: true },
  },
  { versionKey: false, timestamps: true }
);

module.exports = mongoose.models.Usuario || mongoose.model('Usuario', usuarioSchema);
