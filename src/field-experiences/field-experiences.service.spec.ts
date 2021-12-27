import { Test, TestingModule } from '@nestjs/testing';
import { FieldExperiencesService } from './field-experiences.service';

describe('FieldExperiencesService', () => {
  let service: FieldExperiencesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FieldExperiencesService],
    }).compile();

    service = module.get<FieldExperiencesService>(FieldExperiencesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
