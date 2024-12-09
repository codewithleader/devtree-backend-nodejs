import { SlugService } from '@contexts/iam/authentication/domain';

export class SlugSlugService implements SlugService {
  async generateSlug(title: string, replacement: string = ''): Promise<string> {
    const slug = (await import('slug')).default; // Dynamic import
    return slug(title, replacement);
  }
}
