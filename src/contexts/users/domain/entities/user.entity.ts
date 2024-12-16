interface UserData {
  id?: string;
  nickname: string;
  name: string;
  email: string;
  password: string;
}

export class UserEntity {
  public id?: string;
  public nickname: string;
  public name: string;
  public email: string;
  public password: string;

  constructor(data: UserData) {
    const { id, nickname, name, email, password } = data;

    this.id = id;
    this.nickname = nickname;
    this.name = name;
    this.email = email;
    this.password = password;
  }
}
