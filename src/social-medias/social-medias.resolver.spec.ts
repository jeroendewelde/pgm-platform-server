import { Test, TestingModule } from '@nestjs/testing';
import { SocialMediasResolver } from './social-medias.resolver';
import { SocialMediasService } from './social-medias.service';

describe('SocialMediasResolver', () => {
  let resolver: SocialMediasResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SocialMediasResolver, SocialMediasService],
    }).compile();

    resolver = module.get<SocialMediasResolver>(SocialMediasResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
