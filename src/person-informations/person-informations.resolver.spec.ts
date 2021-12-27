import { Test, TestingModule } from '@nestjs/testing';
import { PersonInformationsResolver } from './person-informations.resolver';
import { PersonInformationsService } from './person-informations.service';

describe('PersonInformationsResolver', () => {
  let resolver: PersonInformationsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PersonInformationsResolver, PersonInformationsService],
    }).compile();

    resolver = module.get<PersonInformationsResolver>(PersonInformationsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
