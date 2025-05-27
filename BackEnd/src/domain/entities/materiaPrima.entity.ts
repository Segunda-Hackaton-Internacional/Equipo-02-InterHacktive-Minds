export interface MateriaPrima {
  id: string;
  tipo: 'mango' | 'pitahaya';
  cantidad: number; 
  fechaIngreso: string;
  fechaVencimiento: string;
  estado: 'disponible' | 'vencida' | 'próxima a vencer';
}
