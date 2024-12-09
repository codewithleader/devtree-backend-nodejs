import { isValidEmail } from '@src/contexts/shared/utils';

export class LoginUserDto {
  constructor(
    public readonly email: string,
    public readonly password: string
  ) {}

  static validate(props: { [key: string]: any }): [string[]?, LoginUserDto?] {
    const errors: string[] = [];
    const { email, password, ...rest } = props;

    // Validar si hay propiedades adicionales
    const invalidKeys = Object.keys(rest);
    if (invalidKeys.length > 0) {
      errors.push(`Unexpected properties: ${invalidKeys.join(', ')}.`);
    }

    // Validar email
    if (!email || email.trim().lenght === 0) {
      errors.push('Email is required (DTO).');
    } else if (!!!isValidEmail(email)) {
      errors.push('Email is not valid (DTO).');
    }

    // Validate password
    if (!password || password.trim().length === 0) {
      errors.push('Password is required.');
    } else if (password.length < 6) {
      errors.push('Password is not valid (DTO)');
    } else if (!/[A-Z]/.test(password)) {
      errors.push('Password is not valid (DTO)');
    } else if (!/[a-z]/.test(password)) {
      errors.push('Password is not valid (DTO)');
    } else if (!/[0-9]/.test(password)) {
      errors.push('Password is not valid (DTO)');
    }

    if (errors.length > 0) {
      return [errors, undefined];
    }

    return [undefined, new LoginUserDto(email, password)];
  }
}
