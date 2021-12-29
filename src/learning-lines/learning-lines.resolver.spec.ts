import { Test, TestingModule } from '@nestjs/testing';
import { LearningLinesResolver } from './learning-lines.resolver';
import { LearningLinesService } from './learning-lines.service';

describe('LearningLinesResolver', () => {
  let resolver: LearningLinesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LearningLinesResolver, LearningLinesService],
    }).compile();

    resolver = module.get<LearningLinesResolver>(LearningLinesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
