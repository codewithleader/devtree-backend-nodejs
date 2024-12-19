import { UserDatasource, UserEntity } from '@contexts/users/domain';
import User from './models';
import { CustomError } from '@src/contexts/shared/errors/domain';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { isValidObjectId } from 'mongoose';

// IMPORTANTE: En cada datasource se debe buscar cual es el error de duplicate key para en caso de email duplicado. En MongoDB es error.code: 11000 (Faltaria Postgres, Mysql u otros)
export class UserMongoDbDatasource implements UserDatasource {
  async save(data: UserEntity): Promise<void> {
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
    // Verificar si es un mongoId valido con la funcion de mongoose
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

  // Todo: Transactions
  async update(data: UserEntity): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
