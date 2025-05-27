import { Router } from 'express';
import { CreateMateriaPrimaUseCase, GetAllMateriasPrimasUseCase } from '../../application/useCases/materiaprima/createMateriaPrima.useCase';
import { MateriaPrimaRepository } from '../../infrastructure/database/repositories/materiaPrima.repository.impl';
import { MateriaPrimaController } from '../controllers/materiaPrima.controller';
import { validateRoleMiddleware } from '../middleware/jwtMiddleware';


const router = Router();

const matPrProcess = new MateriaPrimaRepository()
const controller = new MateriaPrimaController(
    new CreateMateriaPrimaUseCase(matPrProcess), 
    new GetAllMateriasPrimasUseCase(matPrProcess)
);

// POST /api/materia-prima
router.get("/", validateRoleMiddleware(['PROVEEDOR']), controller.create);

export default router;
//http://localhost:3000/api/materia-prima