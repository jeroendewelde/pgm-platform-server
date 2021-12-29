import { Test, TestingModule } from '@nestjs/testing';
import { GenerationsResolver } from './generations.resolver';
import { GenerationsService } from './generations.service';

describe('GenerationsResolver', () => {
  let resolver: GenerationsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GenerationsResolver, GenerationsService],
    }).compile();

    resolver = module.get<GenerationsResolver>(GenerationsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
