import { forwardRef, Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesResolver } from './courses.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { ProjectsModule } from 'src/projects/projects.module';
import { PersonsModule } from 'src/persons/persons.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Course]),
    // LearningLinesModule,
    forwardRef(() => ProjectsModule),
    PersonsModule
  ],
  providers: [CoursesResolver, CoursesService],
  exports: [
    CoursesService,
  ]
})
export class CoursesModule {}
