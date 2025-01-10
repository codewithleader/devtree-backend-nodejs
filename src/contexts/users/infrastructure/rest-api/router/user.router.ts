import { Router } from 'express';
import { authenticationMiddleware } from '@contexts/iam/authentication/infrastructure/middlewares';
import { userController } from '@contexts/users/infrastructure/dependencies';
import {
  getUserByNicknameValidatorRules,
  updateMyUserProfileValidatorRules,
} from '@contexts/users/infrastructure/validators';
import { mediaFilesFormidableMiddleware } from '@shared/middlewares';

export class UserRouter {
  static get routes(): Router {
    const router = Router();

    router.get('/me', authenticationMiddleware, userController.getMyUser);

    router.get(
      '/nickname/:nickname',
      getUserByNicknameValidatorRules,
      userController.getUserByNickname
    );

    router.patch(
      '/me/profile',
      authenticationMiddleware,
      mediaFilesFormidableMiddleware, // Este va antes de las validaciones para que se pueda acceder a req.files y normalizar los campos del body de nickname: ['John'] a nickname: 'John' (formdata)
      updateMyUserProfileValidatorRules,
      userController.updateMyProfile
    );

    return router;
  }
}

/**
* They all start with /users

* AUTHENTICATED USER ROUTES
GET    /me          -> Get authenticated user info
PATCH  /me/profile  -> Update authenticated user info (partial)
DELETE /me          -> Delete authenticated user
POST   /            -> Create new user (NO ya que se usará 'auth/register')

* ADMIN ROUTES
GET    /            -> Get Users
GET    /:id         -> Get user info by ID
PUT    /:id         -> Update user info by ID
PATCH  /:id/profile -> Update user info by ID (partial)
DELETE /:id         -> Delete user by ID
*/
