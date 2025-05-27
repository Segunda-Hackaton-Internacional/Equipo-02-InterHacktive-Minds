export interface CreateMateriaPrimaDTO {
  tipo: 'mango' | 'pitahaya';
  cantidad: number;
  fechaIngreso: string; // ISO string (viene de formularios/JSON) es decir, para la fechas se envían como string ISO  y luego se transforman a objetos Date
  fechaVencimiento: string;
}

export interface MateriaPrimaResponseDto {
  id: string;
  tipo: string;
  cantidad: number;
  fechaIngreso: string;
  fechaVencimiento: string;
  estado: string;
}

export interface MateriaPrimaListDto {
  materiasPrimas: MateriaPrimaResponseDto[];
  timestamp: string;
}

/*
export interface UpdateMateriaPrimaDTO {
  tipo?: 'mango' | 'pitahaya';
  cantidad?: number;
  proveedorId?: string;
  fechaIngreso?: string;
  fechaVencimiento?: string;
}*/