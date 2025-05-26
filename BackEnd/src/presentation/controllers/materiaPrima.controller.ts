import { Request, Response } from 'express';
import { CreateMateriaPrimaUseCase } from '../../application/useCases/materiaprima/createMateriaPrima.useCase';
import { MateriaPrimaRepositoryImpl } from '../../infrastructure/database/repositories/materiaPrima.repository.impl';

const repo = new MateriaPrimaRepositoryImpl();
const createUseCase = new CreateMateriaPrimaUseCase(repo);

export const createMateriaPrima = async (req: Request, res: Response) => {
  try {
    const data = await createUseCase.execute(req.body);
    res.status(201).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al crear materia prima' });
  }
};
