import { MateriaPrima } from '../entities/materiaPrima.entity';

export interface MateriaPrimaRepository {
  create(materia: MateriaPrima): Promise<MateriaPrima>;
  update(id: string, materia: Partial<MateriaPrima>): Promise<MateriaPrima | null>;
  findByProveedor(proveedorId: string): Promise<MateriaPrima[]>;
  findAll(): Promise<MateriaPrima[]>;
}
