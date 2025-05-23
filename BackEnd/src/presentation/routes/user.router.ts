import { Router } from 'express';
import {
  CreateAdminUseCase,
  CreateOperatorUseCase,
  DeleteUserUseCase,
  GetAllUsersUseCase,
  GetUserByIdUseCase,
  UpdateUserUseCase,
} from '../../application';
import { CreateProviderUseCase } from '../../application/useCases/user/createProveedor.useCase';
import { UserRepository } from '../../infrastructure/database/repositories';
import { UserController } from '../../presentation';
import { validateRoleMiddleware } from '../middleware/jwtMiddleware';


const router = Router();

const userRepository = new UserRepository();

const createOperatorUseCase = new CreateOperatorUseCase(userRepository);
const createAdminUseCase = new CreateAdminUseCase(userRepository);
const getAllUsersUseCase = new GetAllUsersUseCase(userRepository);
const getUserByIdUseCase = new GetUserByIdUseCase(userRepository);
const updateUserUseCase = new UpdateUserUseCase(userRepository);
const deleteUserUseCase = new DeleteUserUseCase(userRepository);
const createProviderUseCase = new CreateProviderUseCase(userRepository);

const userController = new UserController(
  createOperatorUseCase,
  createAdminUseCase,
  createProviderUseCase, 
  getAllUsersUseCase,
  getUserByIdUseCase,
  updateUserUseCase,
  deleteUserUseCase,
  
);

router.get('/', userController.getAll);
router.post('/operador', userController.createOperator);
router.post('/proveedor', userController.createProvider);
router.post('/admin', userController.createAdmin);
router.get('/:id', userController.getById);
router.patch('/', validateRoleMiddleware(['OPERATOR', 'ADMIN', 'PROVEEDOR']) , userController.update);
router.delete('/', validateRoleMiddleware(['OPERATOR', 'ADMIN', 'PROVEEDOR']) , userController.delete);

export default router;
