import { Test, TestingModule } from '@nestjs/testing';
import { SocialMediasService } from './social-medias.service';

describe('SocialMediasService', () => {
  let service: SocialMediasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SocialMediasService],
    }).compile();

    service = module.get<SocialMediasService>(SocialMediasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
