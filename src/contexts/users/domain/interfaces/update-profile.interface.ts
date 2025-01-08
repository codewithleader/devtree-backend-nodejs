export interface DataToUpdateUserProfile {
  id: string;
  nickname: string;
  bio?: string;
  imageUrl?: string;
  imagePublicId?: string;
  links?: string;
}
