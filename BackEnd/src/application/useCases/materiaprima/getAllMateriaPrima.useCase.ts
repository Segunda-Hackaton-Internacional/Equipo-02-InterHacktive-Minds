
import { MatPr } from '../../../domain/entities/materiaPrima.entity';
import { IMateriaPrimaRepository } from '../../../domain/repositories/materiaPrima.repository';

export class GetAllMateriaPrimaUseCase {
  constructor(private readonly repo: IMateriaPrimaRepository) {}

  async execute(): Promise<MatPr[]> {
    return this.repo.findAll();
  }
}