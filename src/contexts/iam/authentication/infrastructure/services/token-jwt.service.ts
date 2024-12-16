import jwt, { JsonWebTokenError, JwtPayload } from 'jsonwebtoken';
import colors from 'colors';
import { TokenService } from '@contexts/iam/authentication/domain';

export class TokenJwtService implements TokenService {
  constructor(private readonly secretKey: string) {}

  generateToken(payload: JwtPayload, expiresIn: string): string {
    return jwt.sign(payload, this.secretKey, { expiresIn });
  }

  verifyToken(token: string): JwtPayload | string | null {
    try {
      return jwt.verify(token, this.secretKey);
    } catch (error) {
      if (error instanceof JsonWebTokenError) {
        return null;
      }
      console.log(colors.red(error));
      return null;
    }
  }
}
