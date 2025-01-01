import { MediaUploader } from '@contexts/media/domain';

export class DeleteImageUseCase {
  constructor(private readonly mediaUploader: MediaUploader) {}

  execute(publicId: string) {
    return this.mediaUploader.delete(publicId);
  }
}
