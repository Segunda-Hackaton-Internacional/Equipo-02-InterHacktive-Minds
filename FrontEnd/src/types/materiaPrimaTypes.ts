export interface MateriaPrima {
  tipo: 'mango' | 'pitahaya';
  cantidad: number,
  proveedorId: string
  fechaIngreso: string
  fechaVencimiento: string
  estado: string
}