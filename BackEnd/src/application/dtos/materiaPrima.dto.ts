// src/application/dtos/product.dto.ts

import { Static, Type } from '@sinclair/typebox';

// 1. LO QUE ENTRA: creación y actualización
export const CreateMateriaPrimaSchema = Type.Object({
  name:           Type.String(),
  price:          Type.Number(),           // USD, decimal
  quantity:       Type.Number(),           // stock disponible
  expirationDate: Type.Date()              // fecha futura
});
export type CreateMateriaPrimaDto = Static<typeof CreateMateriaPrimaSchema>;

export const UpdateMateriaPrimaSchema = Type.Partial(CreateMateriaPrimaSchema, {
  description: 'Campos opcionales para actualizar un producto'
});
export type UpdateMateriaPrimaDto = Static<typeof UpdateMateriaPrimaSchema>;


// 2. LO QUE SALE: respuesta de un producto o lista

export const MateriaPrimaResponseSchema = Type.Object({
  id:             Type.String(),           // virtual de Mongo
  userId:         Type.String(),
  name:           Type.String(),
  price:          Type.Number(),
  quantity:       Type.Number(),
  expirationDate: Type.Date()
});
export type MateriaPrimaResponseDto = Static<typeof MateriaPrimaResponseSchema>;

export const MateriaPrimaListSchema = Type.Object({
  products: Type.Array(MateriaPrimaResponseSchema)
});
export type MateriaPrimaListDto = Static<typeof MateriaPrimaListSchema>;