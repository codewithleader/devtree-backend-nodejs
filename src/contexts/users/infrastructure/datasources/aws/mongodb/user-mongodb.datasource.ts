import { isValidObjectId } from 'mongoose';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
//
import { CustomError } from '@shared/errors/domain';
import {
  DataToUpdateUserProfile,
  UserDatasource,
  UserEntity,
} from '@contexts/users/domain';
import { User } from './models';
import { DataToRegister } from '@contexts/iam/authentication/domain';

// IMPORTANTE: En cada datasource se debe buscar cual es el error de duplicate key para en caso de email duplicado. En MongoDB es error.code: 11000 (Faltaria Postgres, Mysql u otros)
export class UserMongoDbDatasource implements UserDatasource {
  async create(data: DataToRegister): Promise<void> {
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

  async findByEmailWithPassword(email: string): Promise<UserEntity | null> {
    const user = await User.findOne({ email }).select('+password');
    if (!user) return null;
    return new UserEntity(user);
  }

  async findByNickname(nickname: string): Promise<UserEntity> {
    const user = await User.findOne({ nickname }).select(
      '-email -password -_id'
    );
    if (!user) {
      throw new CustomError(
        `${ReasonPhrases.NOT_FOUND}: User with nickname: ${nickname} not found`,
        StatusCodes.NOT_FOUND
      );
    }
    return new UserEntity(user);
  }

  async findAll(): Promise<UserEntity[]> {
    const users = await User.find();
    if (users.length === 0) return [];
    return users.map((user) => new UserEntity(user));
  }

  async updateUserProfile(data: DataToUpdateUserProfile): Promise<UserEntity> {
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
      return new UserEntity(user);
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

  async searchNickname(nickname: string): Promise<string> {
    const user = await User.findOne({ nickname });
    if (user) {
      throw new CustomError(
        `${ReasonPhrases.CONFLICT}: Nickname no disponible.`,
        StatusCodes.CONFLICT
      );
    }
    return 'Nickname disponible.';
  }
}
