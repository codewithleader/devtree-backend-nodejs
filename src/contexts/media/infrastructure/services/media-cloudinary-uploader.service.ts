import { cloudinary } from '@src/app/config';
import { MediaUploader, UploadedImage } from '@contexts/media/domain';

export class MediaCloudinaryUploader implements MediaUploader {
  async upload(filePath: string): Promise<UploadedImage> {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: 'devtree', // Puedes personalizar la carpeta
    });

    return UploadedImage.create({
      url: result.secure_url,
      publicId: result.public_id,
      width: result.width,
      height: result.height,
    });
  }

  async delete(publicId: string): Promise<void> {
    await cloudinary.uploader.destroy(publicId);
  }
}
