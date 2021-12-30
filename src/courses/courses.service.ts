import { Repository } from 'typeorm';

import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Course } from './entities/course.entity';
import { CreateCourseInput } from './dto/create-course.input';
import { UpdateCourseInput } from './dto/update-course.input';
import { Project } from 'src/projects/entities/project.entity';
import { ProjectsService } from 'src/projects/projects.service';
import { PersonsService } from 'src/persons/persons.service';
import { Person } from 'src/persons/entities/person.entity';
import { AttachmentsService } from 'src/attachments/attachments.service';
import { Attachment } from 'src/attachments/entities/attachment.entity';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
    @Inject(forwardRef(() => ProjectsService))
    private readonly projectService: ProjectsService,
    private personsService: PersonsService,
    private attachmentsService: AttachmentsService,
  ) {}

  create(createCourseInput: CreateCourseInput): Promise<Course> {
    const newCourse = this.courseRepository.create(createCourseInput);
    return this.courseRepository.save(newCourse);
  }

  async addAttachmentsToCourse(courseId: number, attachments: number[]): Promise<Course> {
    const course = await this.courseRepository.findOneOrFail(courseId, { relations: ['attachments'] });

    attachments.forEach(async(attachment) => {
      const newAttachment = await this.attachmentsService.findOneById(attachment);

      if( !course.attachments.includes(newAttachment) ) course.attachments.push(newAttachment);
    })
    return this.courseRepository.save(course);
  }

  async addTeachersToCourse(courseId: number, teacherIds: number[]): Promise<Course> {
    const course = await this.courseRepository.findOneOrFail(courseId, { relations: ['teachers'] });

    teacherIds.forEach(async(teacherId) => {
      const teacher = await this.personsService.findOneById(teacherId);
    
      if(teacher.type === 'TEACHER') {
          if( !course.teachers.includes(teacher) ) course.teachers.push(teacher);
        }
    });    
    return this.courseRepository.save(course);
  }

  findAll(): Promise<Course[]> {
    return this.courseRepository.find();
  }

  findOneById(id: number): Promise<Course> {
    return this.courseRepository.findOneOrFail(id);
  }
  
  findByLearningLineId(learningLineId: number): Promise<Course[]> {
    return this.courseRepository.find({
      where: {
        learningLineId : learningLineId
      }
    })
  }

  async getAttachments(courseId: number): Promise<Attachment[]> {
    const course = await this.courseRepository.findOneOrFail(courseId, {
      relations: ['attachments']
    });
      
    if(course.attachments) return course.attachments;
    return [];
  }

  // findByLearningLineId(learningLineId: number): Promise<Course[]> {
  //   return this.courseRepository.find({
  //     where: {
  //       learningLineId
  //     }
  //   })
  // }


  getProjects(courseId: number): Promise<Project[]> {
    return this.projectService.findByCourseId(courseId);
  }

  async getTeachers(courseId: number): Promise<Person[]> {
    const course = await this.courseRepository.findOneOrFail(courseId, {
      relations: ['teachers']
    });
      
    if(course.teachers) return course.teachers;
    return [];
  }
  

  update(id: number, updateCourseInput: UpdateCourseInput): Promise<Course> {
    return this.courseRepository.save({
      id: id,
      ...updateCourseInput,
    })
  }

  async remove(id: number): Promise<Course> {
    const course = await this.findOneById(id);
    return this.courseRepository.remove(course);
  }
}
