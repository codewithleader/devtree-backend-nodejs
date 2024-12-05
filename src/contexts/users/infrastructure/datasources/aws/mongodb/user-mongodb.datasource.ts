import { UserDatasource, UserEntity } from '@contexts/users/domain';
import User from './models';
import colors from 'colors';
import { CustomError } from '@src/contexts/shared/errors/domain';

export class UserMongoDbDatasource implements UserDatasource {
  async save(data: UserEntity): Promise<void> {
    const newUser = new User(data);
    try {
      await newUser.save();
    } catch (error) {
      // !Importante: En cada datasource se debe buscar cual es el error de duplicate key para en caso de email duplicado. En MongoDB es error.code: 11000 (Faltaria Postgres, Mysql u otros)
      if (error.code === 11000) {
        throw new CustomError(
          `Email ya existe en base de datos: ${data.email}`,
          400
        );
      }
      throw new CustomError(`Error al guardar usuario: ${error.message}`, 500);
    }
  }

  async findById(id: string): Promise<UserEntity> {
    throw new Error('Method not implemented.');
  }

  async findByEmail(email: string): Promise<UserEntity> {
    const userByEmail = await User.findOne({ email });
    console.log(colors.cyan(`${userByEmail}`));
    if (!userByEmail) return null;
    return new UserEntity(userByEmail);
  }

  async findAll(): Promise<UserEntity[]> {
    throw new Error('Method not implemented.');
  }

  async update(data: UserEntity): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
