import { Repository } from 'typeorm';

import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Project } from './entities/project.entity';
import { Course } from 'src/courses/entities/course.entity';

import { CreateProjectInput } from './dto/create-project.input';
import { UpdateProjectInput } from './dto/update-project.input';

import { CoursesService } from 'src/courses/courses.service';
import { Person } from 'src/persons/entities/person.entity';
import { PersonsService } from 'src/persons/persons.service';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
    @Inject(forwardRef(() => CoursesService))
    private coursesService: CoursesService,
    private personsService: PersonsService
  ) {}

  create(createProjectInput: CreateProjectInput): Promise<Project> {
    const newProject = this.projectRepository.create(createProjectInput);
    return this.projectRepository.save(newProject);
  }

  async addStudentsToProject(projectId: number, studentIds: number[]): Promise<Project> {
    const project = await this.projectRepository.findOneOrFail(projectId, { relations: ['students'] });

    studentIds.forEach(async(studentId) => {
      const student = await this.personsService.findOneById(studentId);
    
      if(student.type === 'STUDENT') {
          if( !project.students.includes(student) ) project.students.push(student);
        }
    });    
    return this.projectRepository.save(project);
  }

  findAll(): Promise<Project[]> {
    return this.projectRepository.find();
  }

  findOneById(id: number): Promise<Project> {
    return this.projectRepository.findOneOrFail(id);
  }

  findByCourseId(courseId: number): Promise<Project[]> {
    return this.projectRepository.find({
      where: {
        courseId
      }
    })
  }
  
  getCourse(courseId: number): Promise<Course> {
    return this.coursesService.findOneById(courseId);
  }

  async getStudents(projectId: number): Promise<Person[]> {
    const project = await this.projectRepository.findOneOrFail(projectId, {
      relations: ['students']
    });
      
    if(project.students) return project.students;
    return [];
  }

  update(id: number, updateProjectInput: UpdateProjectInput): Promise<Project> {
    return this.projectRepository.save({
      id: id,
      ...updateProjectInput,
    })
  }

  async remove(id: number): Promise<Project> {
    const project = await this.findOneById(id);
    return this.projectRepository.remove(project);
  }
}
