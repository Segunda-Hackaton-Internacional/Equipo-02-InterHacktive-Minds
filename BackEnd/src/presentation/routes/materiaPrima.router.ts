import { Router } from 'express';
import { createMateriaPrima } from '../controllers/materiaPrima.controller';
import { getMateriaPrimaByProveedor } from '../controllers/materiaPrima.controller';

const router = Router();

// POST /api/materia-prima
router.post('/', createMateriaPrima);
router.get('/:proveedorId', getMateriaPrimaByProveedor);
export default router;
//http://localhost:3000/api/materia-prima