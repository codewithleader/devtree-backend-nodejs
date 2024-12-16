type ExpiresIn = '1h' | '2h' | '24h' | '30d' | '180d';

export abstract class TokenService {
  abstract generateToken(payload: object, expiresIn: ExpiresIn): string;
  abstract verifyToken(token: string): object | string | null;
}
