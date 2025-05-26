import { MateriaPrimaModel } from '../models/materiaPrima.model';
import { MateriaPrimaRepository } from '../../../domain/repositories/materiaPrima.repository';
import { MateriaPrima } from '../../../domain/entities/materiaPrima.entity';

export class MateriaPrimaRepositoryImpl implements MateriaPrimaRepository {
  async create(materia: MateriaPrima): Promise<MateriaPrima> {
    const created = await MateriaPrimaModel.create(materia);
    return this.toDomain(created);
  }

  async update(id: string, materia: Partial<MateriaPrima>): Promise<MateriaPrima | null> {
    const updated = await MateriaPrimaModel.findByIdAndUpdate(id, materia, { new: true });
    return updated ? this.toDomain(updated) : null;
  }

  async findByProveedor(proveedorId: string): Promise<MateriaPrima[]> {
    const docs = await MateriaPrimaModel.find({ proveedorId });
    return docs.map(this.toDomain);
  }

  async findAll(): Promise<MateriaPrima[]> {
    const docs = await MateriaPrimaModel.find();
    return docs.map(this.toDomain);
  }

  private toDomain(doc: any): MateriaPrima {
    return {
      id: doc._id.toString(),
      tipo: doc.tipo,
      cantidad: doc.cantidad,
      proveedorId: doc.proveedorId.toString(),
      fechaIngreso: doc.fechaIngreso,
      fechaVencimiento: doc.fechaVencimiento,
      estado: doc.estado,
    };
  }
}
