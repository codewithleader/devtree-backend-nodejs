import { Files } from 'formidable';
import { UserEntity } from '@src/contexts/users/domain';

declare global {
  namespace Express {
    export interface Request {
      user?: UserEntity;
      files?: Files;
    }
  }
}
