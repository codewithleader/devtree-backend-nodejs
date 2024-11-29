interface UserData {
  name: string;
  email: string;
  password: string;
}

export class UserEntity {
  public name: string;
  public email: string;
  public password: string;

  constructor(data: UserData) {
    const { name, email, password } = data;
    this.name = name;
    this.email = email;
    this.password = password;
  }
}
