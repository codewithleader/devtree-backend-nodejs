interface UserData {
  nickname: string;
  name: string;
  email: string;
  password: string;
}

export class UserEntity {
  public nickname: string;
  public name: string;
  public email: string;
  public password: string;

  constructor(data: UserData) {
    const { nickname, name, email, password } = data;

    this.nickname = nickname;
    this.name = name;
    this.email = email;
    this.password = password;
  }
}
