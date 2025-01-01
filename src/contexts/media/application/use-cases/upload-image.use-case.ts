import { MediaUploader } from '@contexts/media/domain';

export class UploadImageUseCase {
  constructor(private readonly mediaUploader: MediaUploader) {}

  execute(filePath: string) {
    return this.mediaUploader.upload(filePath);
  }
}
