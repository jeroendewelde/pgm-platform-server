import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoursesModule } from './courses/courses.module';
import { TeachersModule } from './teachers/teachers.module';
import { ProjectsModule } from './projects/projects.module';
import { StudentsModule } from './students/students.module';
import { LearlingLinesModule } from './learling-lines/learling-lines.module';
import { SpecialisationsModule } from './specialisations/specialisations.module';
import { CompaniesModule } from './companies/companies.module';

@Module({
  imports: [CoursesModule, TeachersModule, ProjectsModule, StudentsModule, LearlingLinesModule, SpecialisationsModule, CompaniesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
