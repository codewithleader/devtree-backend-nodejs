import { Router } from 'express';
import { authenticationMiddleware } from '@contexts/iam/authentication/infrastructure/middlewares';
import { userController } from '@contexts/users/infrastructure/dependencies';
import { updateUserProfileValidatorRules } from '@contexts/users/infrastructure/validators';

export class UserRouter {
  static get routes(): Router {
    const router = Router();

    router.get('/me', authenticationMiddleware, userController.getUser);

    router.patch(
      '/:id/profile',
      updateUserProfileValidatorRules,
      authenticationMiddleware,
      userController.updateProfile
    );

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
PUT    /:id         -> Actualización TOTAL de la información de usuario por ID
PATCH  /:id/profile -> Actualización PARCIAL de información de usuario por ID
DELETE /:id         -> Eliminar usuario por ID
*/
