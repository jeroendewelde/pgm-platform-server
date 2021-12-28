import { forwardRef, Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsResolver } from './projects.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { CoursesModule } from 'src/courses/courses.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Project]),
    // CoursesModule
    forwardRef(() => CoursesModule)
  ],
  providers: [ProjectsResolver, ProjectsService],
  exports: [
    ProjectsService,
  ]
})
export class ProjectsModule {}
