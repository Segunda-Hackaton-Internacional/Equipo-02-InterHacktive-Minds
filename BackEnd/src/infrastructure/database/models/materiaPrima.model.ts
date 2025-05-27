// src/infrastructure/database/models/product.model.ts
import { Document, InferSchemaType, Schema, Types, model } from 'mongoose';

// 1) Definición del esquema (ya lo tienes con todos los campos)
const MateriaPrimaSchema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      ref: 'User',
      required: true
    },
    name:     { type: String,  required: true },
    price:    { type: Number,  required: true, min: 0 },
    quantity: { type: Number,  required: true, min: 0 },
    expirationDate: {
      type: Date,
      required: true,
      validate: {
        validator: (date: Date) => date > new Date(),
        message: 'La fecha de vencimiento debe ser futura'
      }
    }
  },
  { timestamps: true }
);

// 2) Infiero automáticamente todos los campos del esquema
type MateriaPrimaSchemaType = InferSchemaType<typeof MateriaPrimaSchema>;

// 3) Extiendo Document **incluyendo** _todos_ los campos
export interface MateriaPrimaDocument extends MateriaPrimaSchemaType, Document {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

// 4) Ahora ProductLean “hereda” todos esos campos, y el cast encajará
export type MateriaPrimaLean = Omit<MateriaPrimaDocument, keyof Document> & {
  _id: Types.ObjectId;
};

export const MateriaPrimaModel = model<MateriaPrimaDocument>('MateriaPrima', MateriaPrimaSchema);
