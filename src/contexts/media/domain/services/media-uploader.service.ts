import { UploadedImage } from '@contexts/media/domain';

export interface MediaUploader {
  upload(filePath: string): Promise<UploadedImage>;
  delete(publicId: string): Promise<void>;
}
