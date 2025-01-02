import { Router } from 'express';
import { authenticationMiddleware } from '@contexts/iam/authentication/infrastructure/middlewares';
import { userController } from '@contexts/users/infrastructure/dependencies';
import { updateUserProfileValidatorRules } from '@contexts/users/infrastructure/validators';
import { mediaFilesFormidableMiddleware } from '@shared/middlewares';

export class UserRouter {
  static get routes(): Router {
    const router = Router();

    router.get('/me', authenticationMiddleware, userController.getUser);

    // TODO: En la actualización del perfil se debe agregar la subida de imagen de una vez y quitar la ruta '/:id/image'
    router.patch(
      '/:id/profile',
      authenticationMiddleware,
      mediaFilesFormidableMiddleware, // Este va antes de las validaciones para que se pueda acceder a req.files y normalizar los campos del body de nickname: ['John'] a nickname: 'John' (formdata)
      updateUserProfileValidatorRules,
      userController.updateProfile
    );

    // router.post(
    //   '/:id/image',
    //   // todo: add image upload validator middleware
    //   authenticationMiddleware,
    //   mediaFilesFormidableMiddleware,
    //   userController.uploadImage
    // );

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
