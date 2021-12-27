import { Test, TestingModule } from '@nestjs/testing';
import { LearlingLinesService } from './learling-lines.service';

describe('LearlingLinesService', () => {
  let service: LearlingLinesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LearlingLinesService],
    }).compile();

    service = module.get<LearlingLinesService>(LearlingLinesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
