import { forwardRef, Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesResolver } from './courses.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { ProjectsModule } from 'src/projects/projects.module';
import { PersonsModule } from 'src/persons/persons.module';
import { AttachmentsModule } from 'src/attachments/attachments.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Course]),
    // LearningLinesModule,
    forwardRef(() => ProjectsModule),
    PersonsModule,
    AttachmentsModule
  ],
  providers: [CoursesResolver, CoursesService],
  exports: [
    CoursesService,
  ]
})
export class CoursesModule {}
