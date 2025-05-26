import { MateriaPrimaRepository } from '../../../domain/repositories/materiaPrima.repository';
import { CreateMateriaPrimaDTO } from '../../dtos/materiaPrima.dto';
import { MateriaPrima } from '../../../domain/entities/materiaPrima.entity';

export class CreateMateriaPrimaUseCase {
  constructor(private readonly repo: MateriaPrimaRepository) {}

  async execute(dto: CreateMateriaPrimaDTO): Promise<MateriaPrima> {
    const materia: MateriaPrima = {
      id: '', // Mongoose lo generará
      tipo: dto.tipo,
      cantidad: dto.cantidad,
      proveedorId: dto.proveedorId,
      fechaIngreso: new Date(dto.fechaIngreso),
      fechaVencimiento: new Date(dto.fechaVencimiento),
      estado: this.definirEstado(dto.fechaVencimiento),
    };

    return this.repo.create(materia);
  }

  private definirEstado(fechaVencimientoStr: string): MateriaPrima['estado'] {
    const fechaVencimiento = new Date(fechaVencimientoStr);
    const hoy = new Date();
    const diferenciaEnDias = (fechaVencimiento.getTime() - hoy.getTime()) / (1000 * 60 * 60 * 24);

    if (diferenciaEnDias <= 0) return 'vencida';
    if (diferenciaEnDias <= 3) return 'próxima a vencer';
    return 'disponible';
  }
}
