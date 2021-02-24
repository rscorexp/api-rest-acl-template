import { Router } from 'express';

import authMiddleware from './app/middlewares/authMiddleware';
import permissionMiddleware from './app/middlewares/permissionMiddleware';

import AuthController from './app/controllers/Auth/AuthController';
import UserController from './app/controllers/Auth/UserController';
import PostController from './app/controllers/PostController';
import PermissionController from './app/controllers/ACL/PermissionController';
import RoleController from './app/controllers/ACL/RoleController';
import ForgotPasswordController from './app/controllers/Auth/ForgotPasswordController';

const router = Router();

//CADASTRAR USUÁRIO
router.post('/user', UserController.store); 

router.get('/user', UserController.show);

router.post('/user/forgot-password', ForgotPasswordController.create);

//LISTAR USUÁRIOS
router.get('/list/users', authMiddleware, UserController.index);

//AUTENTICA USUÁRIO
router.post('/session', AuthController.auth);

//PEGA AS INFORMAÇÕES DO USUÁRIO LOGADO
router.get('/session/user', authMiddleware, AuthController.index);

//TESTE DE ACL
router.post('/post/create', authMiddleware, permissionMiddleware("create_post"), PostController.store);

//CRIA ROLE
router.post('/acl/role', RoleController.store);
router.get('/acl/roles', RoleController.index);

//CRIAR PERMISSÃO
router.post('/acl/permission', PermissionController.store);
router.get('/acl/permissions', PermissionController.index);

export default router;