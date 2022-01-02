import { Test, TestingModule } from '@nestjs/testing';
import { InternsResolver } from './interns.resolver';
import { InternsService } from './interns.service';

describe('InternsResolver', () => {
  let resolver: InternsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InternsResolver, InternsService],
    }).compile();

    resolver = module.get<InternsResolver>(InternsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
