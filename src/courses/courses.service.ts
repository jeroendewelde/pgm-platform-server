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

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
    @Inject(forwardRef(() => ProjectsService))
    private readonly projectService: ProjectsService,
    private personsService: PersonsService
  ) {}

  create(createCourseInput: CreateCourseInput): Promise<Course> {
    const newCourse = this.courseRepository.create(createCourseInput);
    return this.courseRepository.save(newCourse);
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
