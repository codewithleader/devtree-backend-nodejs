export interface IUser {
  id?: string;
  nickname: string;
  name: string;
  email: string;
  password?: string;
  bio?: string;
}

export class UserEntity {
  public id?: string;
  public nickname: string;
  public name: string;
  public email: string;
  public password?: string;
  public bio?: string;

  constructor(data: IUser) {
    const { id, nickname, name, email, password, bio } = data;

    this.id = id;
    this.nickname = nickname;
    this.name = name;
    this.email = email;
    this.password = password;
    this.bio = bio;
  }
}
