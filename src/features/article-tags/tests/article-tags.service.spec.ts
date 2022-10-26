import { Test, TestingModule } from '@nestjs/testing';
import { ArticleTagsService } from '../article-tags.service';

describe('ArticleTagsService', () => {
  let service: ArticleTagsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArticleTagsService],
    }).compile();

    service = module.get<ArticleTagsService>(ArticleTagsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
