import { MediaCloudinaryUploader } from '@contexts/media/infrastructure/services';
import {
  DeleteImageUseCase,
  UploadImageUseCase,
} from '@contexts/media/application';

class MediaDependencyFactory {
  static mediaUploader = new MediaCloudinaryUploader();
  static uploadImageUseCase: UploadImageUseCase;
  static deleteImageUseCase: DeleteImageUseCase;

  static getUploadImageUseCase(): UploadImageUseCase {
    if (!this.uploadImageUseCase) {
      this.uploadImageUseCase = new UploadImageUseCase(this.mediaUploader);
    }
    return this.uploadImageUseCase;
  }

  static getDeleteImageUseCase() {
    if (!this.deleteImageUseCase) {
      this.deleteImageUseCase = new DeleteImageUseCase(this.mediaUploader);
    }
    return this.deleteImageUseCase;
  }
}

export { MediaDependencyFactory };
