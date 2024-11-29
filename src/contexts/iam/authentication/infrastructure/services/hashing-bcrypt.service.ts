import { compare, genSalt, hash } from 'bcrypt';
import { HashingService } from '@contexts/iam/authentication/domain';

export class HashingBcryptService implements HashingService {
  async hash(data: string | Buffer): Promise<string> {
    const salt = await genSalt();
    return await hash(data, salt);
  }

  async compare(data: string | Buffer, encrypted: string): Promise<boolean> {
    return await compare(data, encrypted);
  }
}
