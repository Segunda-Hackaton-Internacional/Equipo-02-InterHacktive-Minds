import { MatPr } from '../../../domain/entities/materiaPrima.entity';
import { IMateriaPrimaRepository } from '../../../domain/repositories/materiaPrima.repository';
import { CreateMateriaPrimaDto } from '../../dtos/materiaPrima.dto';

export class CreateMateriaPrimaUseCase {
  constructor(private readonly repo: IMateriaPrimaRepository) {}

  /**
   * Crea un producto asignándole siempre el userId que viene del token
   */
  async execute(
    userId: string,
    data: CreateMateriaPrimaDto
  ): Promise<MatPr> {
    // Construyo la entidad de dominio sin id
    const toCreate: Omit<MatPr, 'id'> = {
      userId,
      name:           data.name,
      price:          data.price,
      quantity:       data.quantity,
      expirationDate: data.expirationDate
    };

    return this.repo.create(toCreate);
  }
}
