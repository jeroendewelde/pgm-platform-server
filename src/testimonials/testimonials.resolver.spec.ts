import { Test, TestingModule } from '@nestjs/testing';
import { TestimonialsResolver } from './testimonials.resolver';
import { TestimonialsService } from './testimonials.service';

describe('TestimonialsResolver', () => {
  let resolver: TestimonialsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TestimonialsResolver, TestimonialsService],
    }).compile();

    resolver = module.get<TestimonialsResolver>(TestimonialsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
