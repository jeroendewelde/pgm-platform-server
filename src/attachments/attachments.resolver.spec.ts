import { Test, TestingModule } from '@nestjs/testing';
import { AttachmentsResolver } from './attachments.resolver';
import { AttachmentsService } from './attachments.service';

describe('AttachmentsResolver', () => {
  let resolver: AttachmentsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AttachmentsResolver, AttachmentsService],
    }).compile();

    resolver = module.get<AttachmentsResolver>(AttachmentsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
