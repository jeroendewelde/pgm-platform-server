import { Repository } from "typeorm";

import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Course } from "./entities/course.entity";
import { CreateCourseInput } from "./dto/create-course.input";
import { UpdateCourseInput } from "./dto/update-course.input";
import { Project } from "src/projects/entities/project.entity";
import { ProjectsService } from "src/projects/projects.service";
import { PersonsService } from "src/persons/persons.service";
import { Person } from "src/persons/entities/person.entity";
import { AttachmentsService } from "src/attachments/attachments.service";
import { Attachment } from "src/attachments/entities/attachment.entity";
import { LearningLine } from "src/learning-lines/entities/learning-line.entity";
import { Specialisation } from "src/specialisations/entities/specialisation.entity";

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
    @Inject(forwardRef(() => ProjectsService))
    private readonly projectService: ProjectsService,
    @Inject(forwardRef(() => PersonsService))
    private readonly personsService: PersonsService,
    private attachmentsService: AttachmentsService
  ) {}

  async create(createCourseInput: CreateCourseInput): Promise<Course> {
    const { teacherIds, teaserImage, ...courseObject } = createCourseInput;

    const newCourse = await this.courseRepository.create({
      teaserImage: teaserImage ? `${process.env.CWD}${teaserImage}` : null,
      ...courseObject,
    });

    if (teacherIds && teacherIds.length > 0) {
      return await this.addTeachersToCourse(newCourse.id, teacherIds);
    } else {
      return this.courseRepository.save(newCourse);
    }
  }

  async addAttachmentsToCourse(
    courseId: number,
    attachments: number[]
  ): Promise<Course> {
    const course = await this.courseRepository.findOneOrFail(courseId, {
      relations: ["attachments"],
    });

    attachments.forEach(async (attachment) => {
      const newAttachment = await this.attachmentsService.findOneById(
        attachment
      );

      if (!course.attachments.includes(newAttachment))
        course.attachments.push(newAttachment);
    });
    return this.courseRepository.save(course);
  }

  async addTeachersToCourse(
    courseId: number,
    teacherIds: number[]
  ): Promise<Course> {
    const course = await this.courseRepository.findOneOrFail(courseId, {
      relations: ["teachers"],
    });

    teacherIds.forEach(async (teacherId) => {
      const teacher = await this.personsService.findOneById(teacherId);

      if (teacher.type === "TEACHER") {
        if (!course.teachers.includes(teacher)) course.teachers.push(teacher);
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
        learningLineId: learningLineId,
      },
    });
  }

  async getAttachments(courseId: number): Promise<Attachment[]> {
    const course = await this.courseRepository.findOneOrFail(courseId, {
      relations: ["attachments"],
    });

    if (course.attachments) return course.attachments;
    return [];
  }

  // findByLearningLineId(learningLineId: number): Promise<Course[]> {
  //   return this.courseRepository.find({
  //     where: {
  //       learningLineId
  //     }
  //   })
  // }

  async getLearningLine(courseId: number): Promise<LearningLine> {
    const course = await this.courseRepository.findOneOrFail(courseId, {
      relations: ["learningLine"],
    });

    if (course.learningLine) return course.learningLine;
    return null;
  }

  async getSpecialisation(courseId: number): Promise<Specialisation> {
    const course = await this.courseRepository.findOneOrFail(courseId, {
      relations: ["specialisation"],
    });

    if (course.specialisation) return course.specialisation;
    return null;
  }

  getProjects(courseId: number): Promise<Project[]> {
    return this.projectService.findByCourseId(courseId);
  }

  async getTeachers(courseId: number): Promise<Person[]> {
    const course = await this.courseRepository.findOneOrFail(courseId, {
      relations: ["teachers"],
    });

    if (course.teachers) return course.teachers;
    return [];
  }

  async update(
    id: number,
    updateCourseInput: UpdateCourseInput
  ): Promise<Course> {
    const { teacherIds, teaserImage, ...courseObject } = updateCourseInput;

    // const updatedCourse1 = this.courseRepository.save({
    //   id: id,
    //   courseObject
    // })

    // let course = await this.courseRepository.findOneOrFail(id, {
    //   relations: ["teachers"]
    // });

    // if (teacherIds && teacherIds.length > 0) {
    await this.updateTeachersInCourse(id, teacherIds);
    // }

    return this.courseRepository.save({
      id: id,
      teaserImage: `${process.env.CWD}${teaserImage}`,
      ...courseObject,
    });
  }

  async updateTeachersInCourse(
    courseId: number,
    teacherIds: number[]
  ): Promise<Course> {
    const course = await this.courseRepository.findOneOrFail(courseId, {
      relations: ["teachers"],
    });

    course.teachers = [];

    teacherIds.forEach(async (teacherId) => {
      const teacher = await this.personsService.findOneById(teacherId);

      if (teacher.type === "TEACHER") {
        course.teachers.push(teacher);
      }
    });

    return this.courseRepository.save(course);
  }

  async remove(id: number): Promise<Course> {
    const course = await this.findOneById(id);
    return this.courseRepository.remove(course);
  }
}
