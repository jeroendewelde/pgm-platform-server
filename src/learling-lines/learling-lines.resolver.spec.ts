import { Test, TestingModule } from '@nestjs/testing';
import { LearlingLinesResolver } from './learling-lines.resolver';
import { LearlingLinesService } from './learling-lines.service';

describe('LearlingLinesResolver', () => {
  let resolver: LearlingLinesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LearlingLinesResolver, LearlingLinesService],
    }).compile();

    resolver = module.get<LearlingLinesResolver>(LearlingLinesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
