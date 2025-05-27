import { Document, InferSchemaType, Schema, Types, model } from 'mongoose';

// 1) Definición del esquema con validaciones mejoradas
const MateriaPrimaSchema = new Schema(
  {
    tipo: { 
      type: String, 
      enum: ['mango', 'pitahaya'], 
      required: [true, 'El tipo es requerido'] 
    },
    cantidad: { 
      type: Number, 
      required: [true, 'La cantidad es requerida'],
      min: [0, 'La cantidad no puede ser negativa']
    },
    proveedorId: { 
      type: Schema.Types.ObjectId, 
      ref: 'User', 
      required: [true, 'El proveedor es requerido'] 
    },
    fechaIngreso: { 
      type: String,
      required: [true, 'La fecha de ingreso es requerida'],
     
    },
    fechaVencimiento: { 
      type: String,
      required: [true, 'La fecha de vencimiento es requerida'],
      validate: {
        validator: function(this: any, date: Date) {
          return date > this.fechaIngreso;
        },
        message: 'La fecha de vencimiento debe ser posterior a la fecha de ingreso'
      }
    },
    estado: { 
      type: String, 
      enum: ['disponible', 'vencida', 'próxima a vencer'], 
      default: 'disponible'
    }
  }, 
  { 
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      }
    }
  }
);

// 2) Inferir automáticamente el tipo del esquema
type MateriaPrimaSchemaType = InferSchemaType<typeof MateriaPrimaSchema>;

// 3) Extender Document con todos los campos
export interface MateriaPrimaDocument extends MateriaPrimaSchemaType, Document {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

// 4) Tipo "lean" para operaciones sin documentos Mongoose
export type MateriaPrimaLean = Omit<MateriaPrimaDocument, keyof Document> & {
  _id: Types.ObjectId;
};

// 5) Modelo con tipado fuerte
export const MateriaPrimaModel = model<MateriaPrimaDocument>('MateriaPrima', MateriaPrimaSchema);
