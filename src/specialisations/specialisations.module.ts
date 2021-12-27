import { Module } from '@nestjs/common';
import { SpecialisationsService } from './specialisations.service';
import { SpecialisationsResolver } from './specialisations.resolver';

@Module({
  providers: [SpecialisationsResolver, SpecialisationsService]
})
export class SpecialisationsModule {}
