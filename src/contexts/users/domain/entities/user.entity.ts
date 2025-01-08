interface UserEntityProps {
  nickname: string;
  name: string;
  email: string;
  // Los opcionales van al final
  id?: string;
  password?: string;
  bio?: string;
  imageUrl?: string;
  imagePublicId?: string;
  links?: string;
}

interface DevTreeLink {
  name: string;
  url: string;
  enabled: boolean;
}
export class UserEntity {
  public nickname: string;
  public name: string;
  public email: string;
  // Los opcionales van al final
  public id?: string;
  public password?: string;
  public bio?: string;
  public imageUrl?: string;
  public imagePublicId?: string;
  public links?: DevTreeLink[];

  constructor({
    nickname,
    name,
    email,
    id,
    password,
    bio,
    imageUrl,
    imagePublicId,
    links,
  }: UserEntityProps) {
    this.nickname = nickname;
    this.name = name;
    this.email = email;
    // Los opcionales van al final
    this.id = id;
    this.password = password;
    this.bio = bio;
    this.imageUrl = imageUrl;
    this.imagePublicId = imagePublicId;
    this.links = JSON.parse(links);
  }
}
