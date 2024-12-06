export class RegisterUserDto {
  private constructor(
    public readonly name: string,
    public readonly email: string,
    public readonly password: string
  ) {}

  static validate(props: {
    [key: string]: any;
  }): [string[]?, RegisterUserDto?] {
    const errors: string[] = [];
    const { name, email, password, ...rest } = props;

    // Validar si hay propiedades adicionales
    const invalidKeys = Object.keys(rest);
    if (invalidKeys.length > 0) {
      errors.push(`Unexpected properties: ${invalidKeys.join(', ')}.`);
    }

    // Validar nombre
    if (!name || name.trim().length === 0) {
      errors.push('Name is required.');
    } else if (name.trim().length < 2) {
      errors.push('Name must be at least 2 characters long.');
    }

    // Validar email
    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const match = String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
    if (!email || email.trim().length === 0) {
      errors.push('Email is required.');
    } else if (!!!match) {
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

    return [undefined, new RegisterUserDto(name, email, password)];
  }
}
