import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CompaniesModule } from "src/companies/companies.module";
import { CoursesModule } from "src/courses/courses.module";
import { PersonInformationsModule } from "src/person-informations/person-informations.module";
import { ProjectsModule } from "src/projects/projects.module";

import { Person } from "./entities/person.entity";
import { PersonsResolver } from "./persons.resolver";
import { PersonsService } from "./persons.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([Person]),
    PersonInformationsModule,
    // CoursesModule,
    forwardRef(() => CoursesModule),
    forwardRef(() => ProjectsModule),
  ],
  providers: [PersonsResolver, PersonsService],
  exports: [PersonsService],
})
export class PersonsModule {}
