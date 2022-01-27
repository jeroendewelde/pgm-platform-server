import { Repository } from "typeorm";

import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Person } from "./entities/person.entity";
import { PersonInformation } from "src/person-informations/entities/person-information.entity";

import { CreatePersonInput } from "./dto/create-person.input";
import { UpdatePersonInput } from "./dto/update-person.input";
import { PersonInformationsService } from "src/person-informations/person-informations.service";
import { CoursesService } from "src/courses/courses.service";
import { Course } from "src/courses/entities/course.entity";
import { InternsService } from "src/interns/interns.service";

@Injectable()
export class PersonsService {
  constructor(
    @InjectRepository(Person)
    private personRepository: Repository<Person>,
    private personInformationService: PersonInformationsService,
    @Inject(forwardRef(() => CoursesService))
    private readonly coursesService: CoursesService,
    @Inject(forwardRef(() => InternsService))
    private readonly internsService: InternsService
  ) {}

  async create(createPersonInput: CreatePersonInput): Promise<Person> {
    const { avatarUrl, courseIds, personInformation, ...personObject } =
      createPersonInput;

    let newPerson: Person;

    // If image is provided, add path prefix to server & save image
    if (avatarUrl) {
      const url = `${process.env.CWD}${createPersonInput?.avatarUrl}`;
      newPerson = await this.personRepository.create({
        avatarUrl: url,
        ...personObject,
      });
    } else {
      newPerson = await this.personRepository.create({
        ...personObject,
      });
    }

    const createdPerson = await this.personRepository.save(newPerson);

    // Add person Information
    if (personInformation) {
      if (
        personInformation.quote !== "" ||
        personInformation.bio !== "" ||
        personInformation.dob !== null
      ) {
        personInformation.personId = createdPerson.id;
        await this.personInformationService.create(personInformation);
      }
    }

    if (courseIds && courseIds.length > 0) {
      return await this.addCoursesToPerson(createdPerson.id, courseIds);
    }
    return createdPerson;
  }

  async addCoursesToPerson(
    personId: number,
    courseIds?: number[]
  ): Promise<Person> {
    const person = await this.personRepository.findOneOrFail(personId, {
      relations: ["courses"],
    });

    // Remove all courses from person
    person.courses = [];
    await this.personRepository.save(person);

    // Add courses to person
    if (courseIds.length > 0) {
      courseIds.forEach(async (courseId) => {
        const course = await this.coursesService.findOneById(courseId);
        person.courses.push(course);
      });
    }

    return this.personRepository.save(person);
  }

  findAll(): Promise<Person[]> {
    return this.personRepository.find();
  }

  findAllStudents(): Promise<Person[]> {
    return this.personRepository.find({
      where: {
        type: "STUDENT",
      },
    });
  }

  findAllTeachers(): Promise<Person[]> {
    return this.personRepository.find({
      where: {
        type: "TEACHER",
      },
    });
  }

  findOneById(id: number): Promise<Person> {
    return this.personRepository.findOneOrFail(id);
  }

  async getPersonInformation(
    personId: number
  ): Promise<PersonInformation | {}> {
    const personInformation =
      await this.personInformationService.findByPersonId(personId);
    if (personInformation) {
      return personInformation;
    } else return {};
  }

  async getCourses(personId: number): Promise<Course[]> {
    const person = await this.personRepository.findOneOrFail(personId, {
      relations: ["courses"],
    });

    if (person.courses) return person.courses;
    return [];
  }

  async update(
    id: number,
    updatePersonInput: UpdatePersonInput
  ): Promise<Person> {
    const { avatarUrl, courseIds, personInformation, ...personObject } =
      updatePersonInput;

    let updatedPerson: Person;

    // Check if image is not changed
    if (avatarUrl) {
      let url;

      if (avatarUrl.split("http").length <= 1) {
        url = `${process.env.CWD}${avatarUrl}`;
      } else url = avatarUrl;

      updatedPerson = await this.personRepository.save({
        id: id,
        avatarUrl: url,
        ...personObject,
      });
    } else {
      updatedPerson = await this.personRepository.save({
        id: id,
        ...personObject,
      });
    }

    // Update person Information
    if (personInformation) {
      const personInfoFromDb =
        await this.personInformationService.findByPersonId(id);

      if (personInfoFromDb) {
        this.personInformationService.update(
          personInfoFromDb.id,
          personInformation
        );
      } else {
        if (
          personInformation.quote !== "" ||
          personInformation.bio !== "" ||
          personInformation.dob !== null
        ) {
          personInformation.personId = updatedPerson.id;
          await this.personInformationService.create(personInformation);
        }
      }
    }

    if (personObject.type === "TEACHER") {
      await this.addCoursesToPerson(id, courseIds);
    }

    return updatedPerson;
  }

  async remove(id: number) {
    const person = await this.findOneById(id);

    const personInformation =
      await this.personInformationService.findByPersonId(id);

    // Foreign key is in personInformation, so check if personInformation exists & delete
    if (personInformation) {
      await this.personInformationService.remove(personInformation.id);
    }

    const interns = await this.internsService.findByStudentId(id);

    // Foreign key is in intern, so check if intern exists & delete, array has 1 or 0
    interns?.forEach(async (intern) => {
      await this.internsService.remove(intern.id);
    });

    if (person) return await this.personRepository.remove(person);
    return null;
  }
}
