export abstract class SlugService {
  abstract generateSlug(title: string, replacement?: string): Promise<string>;
}
