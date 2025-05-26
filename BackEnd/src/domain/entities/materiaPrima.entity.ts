export interface MateriaPrima {
  id: string;
  tipo: 'mango' | 'pitahaya';
  cantidad: number; // en kg
  proveedorId: string;
  fechaIngreso: Date;
  fechaVencimiento: Date;
  estado: 'disponible' | 'vencida' | 'próxima a vencer';
}
