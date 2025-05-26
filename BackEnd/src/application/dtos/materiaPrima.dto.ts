export interface CreateMateriaPrimaDTO {
  tipo: 'mango' | 'pitahaya';
  cantidad: number;
  proveedorId: string;
  fechaIngreso: string; // ISO string (viene de formularios/JSON) es decir, para la fechas se envían como string ISO  y luego se transforman a objetos Date
  fechaVencimiento: string;
}


/*
export interface UpdateMateriaPrimaDTO {
  tipo?: 'mango' | 'pitahaya';
  cantidad?: number;
  proveedorId?: string;
  fechaIngreso?: string;
  fechaVencimiento?: string;
}*/