import { isValidEmail } from '@shared/utils';

export class RegisterUserDto {
  private constructor(
    public readonly nickname: string,
    public readonly name: string,
    public readonly email: string,
    public readonly password: string
  ) {}

  static validate(props: {
    [key: string]: any;
  }): [string[]?, RegisterUserDto?] {
    const errors: string[] = [];
    const { nickname, name, email, password, ...rest } = props;

    // Validar si hay propiedades adicionales
    const invalidKeys = Object.keys(rest);
    if (invalidKeys.length > 0) {
      errors.push(`Unexpected properties: ${invalidKeys.join(', ')}.`);
    }

    // Validar nickname
    if (!nickname || nickname.trim().length === 0) {
      errors.push('nickname is required.');
    } else if (nickname.trim().length < 2) {
      errors.push('nickname must be at least 2 characters long.');
    }

    // Validar nombre
    if (!name || name.trim().length === 0) {
      errors.push('Name is required.');
    } else if (name.trim().length < 2) {
      errors.push('Name must be at least 2 characters long.');
    }

    // Validar email
    if (!email || email.trim().length === 0) {
      errors.push('Email is required.');
    } else if (!isValidEmail(email)) {
      errors.push('Email is not valid.');
    }

    // Validar contraseña
    if (!password || password.trim().length === 0) {
      errors.push('Password is required.');
    } else if (password.length < 6) {
      errors.push('Password must be at least 6 characters long.');
    } else if (!/[A-Z]/.test(password)) {
      errors.push('Password must contain at least one uppercase letter.');
    } else if (!/[a-z]/.test(password)) {
      errors.push('Password must contain at least one lowercase letter.');
    } else if (!/[0-9]/.test(password)) {
      errors.push('Password must contain at least one number.');
    }

    if (errors.length > 0) {
      return [errors, undefined];
    }

    return [undefined, new RegisterUserDto(nickname, name, email, password)];
  }
}
