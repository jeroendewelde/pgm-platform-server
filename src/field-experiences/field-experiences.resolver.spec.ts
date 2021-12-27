import { Test, TestingModule } from '@nestjs/testing';
import { FieldExperiencesResolver } from './field-experiences.resolver';
import { FieldExperiencesService } from './field-experiences.service';

describe('FieldExperiencesResolver', () => {
  let resolver: FieldExperiencesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FieldExperiencesResolver, FieldExperiencesService],
    }).compile();

    resolver = module.get<FieldExperiencesResolver>(FieldExperiencesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
