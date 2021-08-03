import { Test, TestingModule } from '@nestjs/testing';

import { ArticleService } from '../services/article.service';
import { ArticleResolver } from './article.resolver';

describe('ArticleResolver', () => {
  let resolver: ArticleResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ArticleResolver,
        {
          provide: ArticleService,
          useValue: {},
        },
      ],
    }).compile();

    resolver = module.get<ArticleResolver>(ArticleResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
