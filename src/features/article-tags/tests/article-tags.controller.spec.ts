import { Test, TestingModule } from '@nestjs/testing';
import { ArticleTagsController } from '../article-tags.controller';
import { ArticleTagsService } from '../article-tags.service';


describe('ArticleTagsController', () => {
  let controller: ArticleTagsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArticleTagsController],
      providers: [ArticleTagsService],
    }).compile();

    controller = module.get<ArticleTagsController>(ArticleTagsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
