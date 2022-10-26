import { Test, TestingModule } from '@nestjs/testing';
import { ArticleTranslationsController } from '../article-translations.controller';
import { ArticleTranslationsService } from '../article-translations.service';

describe('ArticleTranslationsController', () => {
  let controller: ArticleTranslationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArticleTranslationsController],
      providers: [ArticleTranslationsService],
    }).compile();

    controller = module.get<ArticleTranslationsController>(ArticleTranslationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
