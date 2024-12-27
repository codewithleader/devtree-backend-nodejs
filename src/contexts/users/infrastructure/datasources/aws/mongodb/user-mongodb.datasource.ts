import { UserDatasource, UserEntity } from '@contexts/users/domain';
import User from './models';
import { CustomError } from '@src/contexts/shared/errors/domain';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { isValidObjectId } from 'mongoose';
import { RegisterUserDto } from '@src/contexts/iam/authentication/application';
import { UpdateUserProfileDto } from '@src/contexts/users/application';

// IMPORTANTE: En cada datasource se debe buscar cual es el error de duplicate key para en caso de email duplicado. En MongoDB es error.code: 11000 (Faltaria Postgres, Mysql u otros)
export class UserMongoDbDatasource implements UserDatasource {
  async save(data: RegisterUserDto): Promise<void> {
    const newUser = new User(data);
    try {
      await newUser.save();
    } catch (error: any) {
      if (error.code === 11000) {
        const key = Object.keys(error.keyValue)[0];
        const value = Object.values(error.keyValue)[0];
        throw new CustomError(
          `${
            ReasonPhrases.CONFLICT
          }: User with ${key.toUpperCase()}: ${value} is already registered in the database`,
          StatusCodes.CONFLICT
        );
      }
      throw new CustomError(
        `${ReasonPhrases.INTERNAL_SERVER_ERROR}: Error al guardar usuario: ${error.message}`,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async findById(id: string): Promise<UserEntity | null> {
    // Verifica si es un mongoId valido con la funcion de mongoose
    if (id && !isValidObjectId(id)) return null;
    const user = await User.findById(id);
    if (!user) return null;
    return new UserEntity(user);
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await User.findOne({ email }).select('email password');
    if (!user) return null;
    return new UserEntity(user);
  }

  async findAll(): Promise<UserEntity[]> {
    const users = await User.find();
    if (users.length === 0) return [];
    return users.map((user) => new UserEntity(user));
  }

  async updateUserProfile(data: UpdateUserProfileDto): Promise<void> {
    const { id, ...rest } = data;
    if (!isValidObjectId(id)) {
      throw new CustomError(
        `${ReasonPhrases.BAD_REQUEST}: Invalid user id`,
        StatusCodes.BAD_REQUEST
      );
    }
    try {
      const user = await User.findByIdAndUpdate(id, rest, { new: true });
      if (!user) {
        throw new CustomError(
          `${ReasonPhrases.NOT_FOUND}: User with id: ${id} not found`,
          StatusCodes.NOT_FOUND
        );
      }
      return;
    } catch (error: any) {
      if (error.code === 11000) {
        const key = Object.keys(error.keyValue)[0];
        const value = Object.values(error.keyValue)[0];
        throw new CustomError(
          `${
            ReasonPhrases.CONFLICT
          }: User with ${key.toUpperCase()}: ${value} is already registered in the database`,
          StatusCodes.CONFLICT
        );
      }
      throw new CustomError(
        `${ReasonPhrases.INTERNAL_SERVER_ERROR}: Error al actualizar el perfil del usuario: ${error.message}`,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
}
