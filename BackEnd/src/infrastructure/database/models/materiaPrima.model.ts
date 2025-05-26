import { Schema, model } from 'mongoose';

const materiaPrimaSchema = new Schema({
  tipo: { type: String, enum: ['mango', 'pitahaya'], required: true },
  cantidad: { type: Number, required: true },
  proveedorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  fechaIngreso: { type: Date, required: true },
  fechaVencimiento: { type: Date, required: true },
  estado: { type: String, enum: ['disponible', 'vencida', 'próxima a vencer'], required: true }
}, { timestamps: true });

export const MateriaPrimaModel = model('MateriaPrima', materiaPrimaSchema);
