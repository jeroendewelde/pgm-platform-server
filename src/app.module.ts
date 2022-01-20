import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { join } from "path";

// Database Imports
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DatabaseConfig } from "./database.config";
import { config } from "./config";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";

// Custom Entities
import { Person } from "./persons/entities/person.entity";
import { PersonInformation } from "./person-informations/entities/person-information.entity";

// Custom Modules
import { PersonsModule } from "./persons/persons.module";
import { PersonInformationsModule } from "./person-informations/person-informations.module";
import { SocialMediasModule } from "./social-medias/social-medias.module";
import { SocialMedia } from "./social-medias/entities/social-media.entity";
import { FieldExperiencesModule } from "./field-experiences/field-experiences.module";
import { FieldExperience } from "./field-experiences/entities/field-experience.entity";
import { ProjectsModule } from "./projects/projects.module";
import { Project } from "./projects/entities/project.entity";
import { CoursesModule } from "./courses/courses.module";
import { Course } from "./courses/entities/course.entity";
import { LearningLinesModule } from "./learning-lines/learning-lines.module";
import { LearningLine } from "./learning-lines/entities/learning-line.entity";
import { AttachmentsModule } from "./attachments/attachments.module";
import { Attachment } from "./attachments/entities/attachment.entity";
import { SpecialisationsModule } from "./specialisations/specialisations.module";
import { Specialisation } from "./specialisations/entities/specialisation.entity";
import { GenerationsModule } from "./generations/generations.module";
import { Generation } from "./generations/entities/generation.entity";
import { CompaniesModule } from "./companies/companies.module";
import { Company } from "./companies/entities/company.entity";
import { InternsModule } from "./interns/interns.module";
import { Intern } from "./interns/entities/intern.entity";
import { UsersModule } from "./users/users.module";
import { User } from "./users/entities/user.entity";
import { AuthModule } from "./auth/auth.module";
import { TestimonialsModule } from "./testimonials/testimonials.module";
import { Testimonial } from "./testimonials/entities/testimonial.entity";

@Module({
  imports: [
    GraphQLModule.forRoot({
      playground: true,
      introspection: true,
      autoSchemaFile: join(process.cwd(), "src/schema.gql"),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: DatabaseConfig,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    TypeOrmModule.forFeature([
      Attachment,
      Company,
      Course,
      FieldExperience,
      Generation,
      Intern,
      LearningLine,
      Person,
      Project,
      PersonInformation,
      SocialMedia,
      Specialisation,
      User,
      Testimonial,
    ]),
    PersonsModule,
    PersonInformationsModule,
    SocialMediasModule,
    FieldExperiencesModule,
    ProjectsModule,
    CoursesModule,
    LearningLinesModule,
    AttachmentsModule,
    SpecialisationsModule,
    GenerationsModule,
    CompaniesModule,
    InternsModule,
    UsersModule,
    AuthModule,
    TestimonialsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
