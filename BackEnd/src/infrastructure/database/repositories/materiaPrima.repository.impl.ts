import { Types } from 'mongoose';
import { MatPr } from '../../../domain/entities/materiaPrima.entity';
import { IMateriaPrimaRepository } from '../../../domain/repositories/materiaPrima.repository';
import { MateriaPrimaLean, MateriaPrimaModel } from '../models/materiaPrima.model';

export class MateriaPrimaRepository implements IMateriaPrimaRepository {
  async findAll(): Promise<MatPr[]> {
    const docs = await MateriaPrimaModel.find().lean<MateriaPrimaLean[]>().exec();
    return docs.map(doc => this.toDomain(doc));
  }

  async create(data: Omit<MatPr, 'id'>): Promise<MatPr> {
    const created = await MateriaPrimaModel.create(data);
    const doc = created.toObject() as MateriaPrimaLean;
    return this.toDomain(doc);
  }

  /** Mapea un objeto lean (POJO) a la entidad de dominio */
  private toDomain(doc: MateriaPrimaLean): MatPr {
    return {
      id:             doc._id.toHexString(),
      userId:         (doc.userId as Types.ObjectId).toHexString(),
      name:           doc.name,
      price:          doc.price,
      quantity:       doc.quantity,
      expirationDate: doc.expirationDate
    };
  }
}
