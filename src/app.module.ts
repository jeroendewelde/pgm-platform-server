import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { join } from "path";

// Database Imports
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DatabaseConfig } from "./database.config";
import { config } from "./config";
import { MulterModule } from "@nestjs/platform-express";
import { PhotosModule } from "./photos/photos.module";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";

// Custom Entities
import { Attachment } from "./attachments/entities/attachment.entity";
import { Company } from "./companies/entities/company.entity";
import { Course } from "./courses/entities/course.entity";
import { FieldExperience } from "./field-experiences/entities/field-experience.entity";
import { Generation } from "./generations/entities/generation.entity";
import { Intern } from "./interns/entities/intern.entity";
import { LearningLine } from "./learning-lines/entities/learning-line.entity";
import { Person } from "./persons/entities/person.entity";
import { PersonInformation } from "./person-informations/entities/person-information.entity";
import { Project } from "./projects/entities/project.entity";
import { SocialMedia } from "./social-medias/entities/social-media.entity";
import { Specialisation } from "./specialisations/entities/specialisation.entity";
import { Testimonial } from "./testimonials/entities/testimonial.entity";
import { User } from "./users/entities/user.entity";

// Custom Modules
import { AuthModule } from "./auth/auth.module";
import { AttachmentsModule } from "./attachments/attachments.module";
import { CompaniesModule } from "./companies/companies.module";
import { CoursesModule } from "./courses/courses.module";
import { FieldExperiencesModule } from "./field-experiences/field-experiences.module";
import { GenerationsModule } from "./generations/generations.module";
import { InternsModule } from "./interns/interns.module";
import { LearningLinesModule } from "./learning-lines/learning-lines.module";
import { PersonsModule } from "./persons/persons.module";
import { PersonInformationsModule } from "./person-informations/person-informations.module";
import { ProjectsModule } from "./projects/projects.module";
import { SocialMediasModule } from "./social-medias/social-medias.module";
import { SpecialisationsModule } from "./specialisations/specialisations.module";
import { TestimonialsModule } from "./testimonials/testimonials.module";
import { UsersModule } from "./users/users.module";

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
    MulterModule.register({
      dest: "./files",
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
    PhotosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
