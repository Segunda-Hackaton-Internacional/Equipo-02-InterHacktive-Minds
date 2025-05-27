import { MateriaPrima } from '../entities/materiaPrima.entity';

export interface IMateriaPrimaRepository {
  create(materia: Omit<MateriaPrima, 'id'>): Promise<MateriaPrima>;
  findAll(): Promise<MateriaPrima[]>;
}
