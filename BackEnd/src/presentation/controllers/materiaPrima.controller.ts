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

export const getMateriaPrimaByProveedor = async (req: Request, res: Response) => {
  try {
    const proveedorId = req.params.proveedorId;
    const data = await repo.findByProveedor(proveedorId);
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener materias primas' });
  }
};

export const updateMateriaPrima = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const update = req.body;

    console.log('Intentando actualizar ID:', id);
const updated = await repo.update(id, update);
console.log('Resultado:', updated);


    if (!updated) {
      return res.status(404).json({ error: 'Materia prima no encontrada' });
    }

    res.status(200).json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al actualizar materia prima' });
  }
};
