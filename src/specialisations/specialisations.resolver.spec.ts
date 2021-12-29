import { Test, TestingModule } from '@nestjs/testing';
import { SpecialisationsResolver } from './specialisations.resolver';
import { SpecialisationsService } from './specialisations.service';

describe('SpecialisationsResolver', () => {
  let resolver: SpecialisationsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SpecialisationsResolver, SpecialisationsService],
    }).compile();

    resolver = module.get<SpecialisationsResolver>(SpecialisationsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
