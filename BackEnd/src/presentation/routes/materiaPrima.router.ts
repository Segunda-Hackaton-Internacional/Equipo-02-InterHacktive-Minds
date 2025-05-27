import { Router } from 'express';

import { CreateMateriaPrimaUseCase } from '../../application/useCases/materiaprima/createMateriaPrima.useCase';
import { GetAllMateriaPrimaUseCase } from '../../application/useCases/materiaprima/getAllMateriaPrima.useCase';
import { MateriaPrimaRepository } from '../../infrastructure/database/repositories/materiaPrima.repository.impl';
import { MateriaPrimaController } from '../controllers/materiaPrima.controller';
import { validateRoleMiddleware } from '../middleware/jwtMiddleware';

const router = Router();
const repository = new MateriaPrimaRepository();

const createUseCase = new CreateMateriaPrimaUseCase(repository);
const getAllUseCase = new GetAllMateriaPrimaUseCase(repository);

const controller = new MateriaPrimaController(
  createUseCase,
  getAllUseCase,
  
);

router.post('/', validateRoleMiddleware(['OPERATOR', 'ADMIN', 'PROVEEDOR']) ,controller.create);
router.get('/', validateRoleMiddleware(['OPERATOR', 'ADMIN', 'PROVEEDOR']) ,controller.getAll);


export default router;