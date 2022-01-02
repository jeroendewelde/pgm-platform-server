import { Test, TestingModule } from '@nestjs/testing';
import { LearningLinesService } from './learning-lines.service';

describe('LearningLinesService', () => {
  let service: LearningLinesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LearningLinesService],
    }).compile();

    service = module.get<LearningLinesService>(LearningLinesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
