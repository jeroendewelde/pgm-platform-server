import { forwardRef, Module } from "@nestjs/common";
import { ProjectsService } from "./projects.service";
import { ProjectsResolver } from "./projects.resolver";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Project } from "./entities/project.entity";
import { CoursesModule } from "src/courses/courses.module";
import { PersonsModule } from "src/persons/persons.module";
import { AttachmentsModule } from "src/attachments/attachments.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([Project]),
    forwardRef(() => CoursesModule),
    // PersonsModule,
    forwardRef(() => PersonsModule),
    AttachmentsModule,
  ],
  providers: [ProjectsResolver, ProjectsService],
  exports: [ProjectsService],
})
export class ProjectsModule {}
