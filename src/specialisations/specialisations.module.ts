import { Module } from '@nestjs/common';
import { SpecialisationsService } from './specialisations.service';
import { SpecialisationsResolver } from './specialisations.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Specialisation } from './entities/specialisation.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Specialisation]),
  ],
  providers: [SpecialisationsResolver, SpecialisationsService]
})
export class SpecialisationsModule {}
