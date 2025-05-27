import { MateriaPrima } from '../../../domain/entities/materiaPrima.entity';
import { IMateriaPrimaRepository } from '../../../domain/repositories/materiaPrima.repository';
import { CreateMateriaPrimaDTO } from '../../dtos/materiaPrima.dto';

export class CreateMateriaPrimaUseCase {
  constructor(private readonly repo: IMateriaPrimaRepository) {}

  async execute(dto: CreateMateriaPrimaDTO): Promise<MateriaPrima> {
    const materia: MateriaPrima = {
      id: '', // Mongoose lo generará
      tipo: dto.tipo,
      cantidad: dto.cantidad,
      fechaIngreso: dto.fechaIngreso,
      fechaVencimiento: dto.fechaVencimiento,
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

export class GetAllMateriasPrimasUseCase {
  constructor(private readonly repo: IMateriaPrimaRepository) {}

  async execute(): Promise<MateriaPrima[]> {
    try {
      const materiasPrimas = await this.repo.findAll();
      
      // Optionally refresh the status based on current date
      const materiasActualizadas = materiasPrimas.map(materia => ({
        ...materia,
        
      }));

      return materiasActualizadas;
    } catch (error) {
      console.error('Error fetching materias primas:', error);
      throw new Error('Failed to retrieve materias primas');
    }
  }

 

   toListDto(materias: MateriaPrima[]): CreateMateriaPrimaDTO[] {
    return materias.map(materia => ({
      id: materia.id,
      tipo: materia.tipo,
      cantidad: materia.cantidad,
      fechaIngreso: materia.fechaIngreso,
      fechaVencimiento: materia.fechaVencimiento,
      estado: materia.estado,
      diasRestantes: 0
    }));
  }

   
}
