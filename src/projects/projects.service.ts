import { Repository } from "typeorm";

import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Project } from "./entities/project.entity";
import { Course } from "src/courses/entities/course.entity";

import { CreateProjectInput } from "./dto/create-project.input";
import { UpdateProjectInput } from "./dto/update-project.input";

import { CoursesService } from "src/courses/courses.service";
import { Person } from "src/persons/entities/person.entity";
import { PersonsService } from "src/persons/persons.service";
import { Attachment } from "src/attachments/entities/attachment.entity";
import { CreateAttachmentInput } from "src/attachments/dto/create-attachment.input";
import { AttachmentsService } from "src/attachments/attachments.service";

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
    @Inject(forwardRef(() => CoursesService))
    private coursesService: CoursesService,
    @Inject(forwardRef(() => PersonsService))
    private personsService: PersonsService,
    private attachmentsService: AttachmentsService
  ) {}

  async create(createProjectInput: CreateProjectInput): Promise<Project> {
    const { studentIds, teaserImage, ...projectObject } = createProjectInput;

    const newProject = await this.projectRepository.create({
      teaserImage: `${process.env.CWD}${teaserImage}`,
      ...projectObject,
    });

    if (studentIds && studentIds.length > 0) {
      return await this.addStudentsToProject(newProject.id, studentIds);
    } else {
      return this.projectRepository.save(newProject);
    }
  }

  async addAttachmentsToProject(
    projectId: number,
    attachments: number[]
  ): Promise<Project> {
    const project = await this.projectRepository.findOneOrFail(projectId, {
      relations: ["attachments"],
    });

    attachments.forEach(async (attachment) => {
      const newAttachment = await this.attachmentsService.findOneById(
        attachment
      );

      if (!project.attachments.includes(newAttachment))
        project.attachments.push(newAttachment);
    });
    return this.projectRepository.save(project);
  }

  async addStudentsToProject(
    projectId: number,
    studentIds: number[]
  ): Promise<Project> {
    const project = await this.projectRepository.findOneOrFail(projectId, {
      relations: ["students"],
    });

    studentIds.forEach(async (studentId) => {
      const student = await this.personsService.findOneById(studentId);

      if (student.type === "STUDENT") {
        if (!project.students.includes(student)) project.students.push(student);
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
        courseId,
      },
    });
  }

  async getAttachments(projectId: number): Promise<Attachment[]> {
    const project = await this.projectRepository.findOneOrFail(projectId, {
      relations: ["attachments"],
    });

    if (project.attachments) return project.attachments;
    return [];
  }

  getCourse(courseId: number): Promise<Course> {
    return this.coursesService.findOneById(courseId);
  }

  async getStudents(projectId: number): Promise<Person[]> {
    const project = await this.projectRepository.findOneOrFail(projectId, {
      relations: ["students"],
    });

    if (project.students) return project.students;
    return [];
  }

  async update(
    id: number,
    updateProjectInput: UpdateProjectInput
  ): Promise<Project> {
    const { studentIds, teaserImage, ...projectObject } = updateProjectInput;
    console.log("....studentIds...", studentIds);

    if (studentIds && studentIds.length > 0) {
      await this.updateStudentsInProject(id, studentIds);
    }

    return this.projectRepository.save({
      id: id,
      teaserImage: `${process.env.CWD}${teaserImage}`,
      ...projectObject,
    });
  }

  async updateStudentsInProject(
    projectId: number,
    studentIds: number[]
  ): Promise<Project> {
    const project = await this.projectRepository.findOneOrFail(projectId, {
      relations: ["students"],
    });
    console.log("updateStudentsInProject", projectId, studentIds);

    project.students = [];

    studentIds.forEach(async (studentId) => {
      const student = await this.personsService.findOneById(studentId);

      if (student.type === "STUDENT") {
        // if (!project.students.includes(student)) project.students.push(student);
        project.students.push(student);
      }
    });

    const savedProject = await this.projectRepository.save(project);
    console.log("...na save....", savedProject);
    // return this.projectRepository.save(project);
    return savedProject;
  }

  async remove(id: number): Promise<Project> {
    const project = await this.findOneById(id);
    return this.projectRepository.remove(project);
  }
}
