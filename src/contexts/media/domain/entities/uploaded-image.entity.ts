export class UploadedImage {
  constructor(
    public readonly url: string,
    public readonly publicId: string,
    public readonly width: number,
    public readonly height: number
  ) {}

  static create(props: {
    url: string;
    publicId: string;
    width: number;
    height: number;
  }): UploadedImage {
    return new UploadedImage(
      props.url,
      props.publicId,
      props.width,
      props.height
    );
  }
}
