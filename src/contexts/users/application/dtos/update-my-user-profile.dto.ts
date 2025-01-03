export class UpdateMyUserProfileDto {
  private constructor(
    public readonly id: string,
    public readonly nickname: string,
    public readonly bio: string,
    public readonly imageUrl?: string,
    public readonly imagePublicId?: string
  ) {}

  static validate(
    props: Record<string, any>
  ): [string[]?, UpdateMyUserProfileDto?] {
    const errors: string[] = [];
    const { id, nickname, bio, imageUrl, imagePublicId, ...rest } = props;

    // Validate if there are additional properties
    const invalidKeys = Object.keys(rest);
    if (invalidKeys.length > 0) {
      errors.push(`Unexpected properties: ${invalidKeys.join(', ')}.`);
    }

    // Validate id
    if (!id || id.trim().length === 0) {
      errors.push('id is required.');
    } else if (id.trim().length < 24 || id.trim().length > 24) {
      errors.push('id is not valid.');
    }

    // Validate nickname
    if (!nickname || nickname.trim().length === 0) {
      errors.push('nickname is required.');
    } else if (nickname.trim().length < 2) {
      errors.push('nickname must be at least 2 characters long.');
    }

    // Validate bio
    if (!bio || bio.trim().length === 0) {
      errors.push('bio is required.');
    } else if (bio.trim().length < 2) {
      errors.push('bio must be at least 2 characters long.');
    }

    if (errors.length > 0) {
      return [errors, undefined];
    }

    return [undefined, new UpdateMyUserProfileDto(id, nickname, bio)];
  }
}
