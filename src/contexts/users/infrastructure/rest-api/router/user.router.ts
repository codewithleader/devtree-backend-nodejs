import { authenticationMiddleware } from '@src/contexts/iam/authentication/infrastructure/middlewares';
import { Router } from 'express';
import { userController } from '../../dependencies';

export class UserRouter {
  static get routes(): Router {
    const router = Router();

    router.get('/me', authenticationMiddleware, userController.getUser);

    // router.get('/:id', (req, res) => res.status(200).send('Not implemented'));

    return router;
  }
}

/**
* They all start with /users
GET    /            -> Listado de usuarios (por admin)
GET    /me          -> Información del usuario autenticado
PUT    /me          -> Actualizar información del usuario autenticado
DELETE /me          -> Eliminar el usuario autenticado
POST   /            -> Crear un nuevo usuario (NO ya que se usará 'auth/register')
GET    /:id         -> Información de usuario por ID
GET    /:id/profile -> Información del perfil de usuario por ID
GET    /:id/roles   -> Información de los roles del usuario por ID
PUT    /:id         -> Actualizar información de usuario por ID
DELETE /:id         -> Eliminar usuario por ID
*/
