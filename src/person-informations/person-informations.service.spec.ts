import { Test, TestingModule } from '@nestjs/testing';
import { PersonInformationsService } from './person-informations.service';

describe('PersonInformationsService', () => {
  let service: PersonInformationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PersonInformationsService],
    }).compile();

    service = module.get<PersonInformationsService>(PersonInformationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
