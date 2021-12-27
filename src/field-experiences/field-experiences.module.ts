import { Module } from '@nestjs/common';
import { FieldExperiencesService } from './field-experiences.service';
import { FieldExperiencesResolver } from './field-experiences.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FieldExperience } from './entities/field-experience.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([FieldExperience]),
  ],
  providers: [FieldExperiencesResolver, FieldExperiencesService],
  exports: [
    FieldExperiencesService,
  ]
})
export class FieldExperiencesModule {}
