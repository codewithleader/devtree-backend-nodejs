import { SlugSlugService } from '@shared/services/infrastructure';

export class SharedDependencyFactory {
  static slugService: SlugSlugService;

  static getSlugService(): SlugSlugService {
    if (!this.slugService) {
      this.slugService = new SlugSlugService();
    }
    return this.slugService;
  }
}
