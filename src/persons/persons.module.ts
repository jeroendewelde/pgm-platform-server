import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonInformationsModule } from 'src/person-informations/person-informations.module';

import { Person } from './entities/person.entity';
import { PersonsResolver } from './persons.resolver';
import { PersonsService } from './persons.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Person]),
    PersonInformationsModule
  ],
  providers: [PersonsResolver, PersonsService],
  exports: [
    PersonsService,
  ]
})
export class PersonsModule {}
