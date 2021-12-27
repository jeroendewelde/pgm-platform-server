import { Test, TestingModule } from '@nestjs/testing';
import { SpecialisationsService } from './specialisations.service';

describe('SpecialisationsService', () => {
  let service: SpecialisationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SpecialisationsService],
    }).compile();

    service = module.get<SpecialisationsService>(SpecialisationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
