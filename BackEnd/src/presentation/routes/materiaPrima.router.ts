import { Router } from 'express';
import { createMateriaPrima } from '../controllers/materiaPrima.controller';

const router = Router();

// POST /api/materia-prima
router.post('/', createMateriaPrima);

export default router;
//http://localhost:3000/api/materia-prima