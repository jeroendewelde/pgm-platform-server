import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FieldExperiencesModule } from 'src/field-experiences/field-experiences.module';
import { SocialMediasModule } from 'src/social-medias/social-medias.module';

import { PersonInformation } from './entities/person-information.entity';
import { PersonInformationsResolver } from './person-informations.resolver';
import { PersonInformationsService } from './person-informations.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([PersonInformation]),
    FieldExperiencesModule,
    SocialMediasModule
  ],
  providers: [PersonInformationsResolver, PersonInformationsService],
  exports: [
    PersonInformationsService,
  ]
})
export class PersonInformationsModule {}
