import { Test, TestingModule } from '@nestjs/testing';

import { ArticleTranslationsService } from '../article-translations.service';

describe('ArticleTranslationsService', () => {
  let service: ArticleTranslationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArticleTranslationsService],
    }).compile();

    service = module.get<ArticleTranslationsService>(ArticleTranslationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
