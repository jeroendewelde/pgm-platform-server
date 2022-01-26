import { Repository } from "typeorm";

import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Person } from "./entities/person.entity";
import { PersonInformation } from "src/person-informations/entities/person-information.entity";

import { CreatePersonInput } from "./dto/create-person.input";
import { UpdatePersonInput } from "./dto/update-person.input";
import { PersonInformationsService } from "src/person-informations/person-informations.service";
import { CreatePersonInformationInput } from "src/person-informations/dto/create-person-information.input";
import { CoursesService } from "src/courses/courses.service";
import { Course } from "src/courses/entities/course.entity";

@Injectable()
export class PersonsService {
  constructor(
    @InjectRepository(Person)
    private personRepository: Repository<Person>,
    private personInformationService: PersonInformationsService,
    @Inject(forwardRef(() => CoursesService))
    private readonly coursesService: CoursesService
  ) {}

  async create(createPersonInput: CreatePersonInput): Promise<Person> {
    const { avatarUrl, courseIds, personInformation, ...personObject } =
      createPersonInput;

    console.log(".....personObject", personObject);

    const newPerson = await this.personRepository.save({
      avatarUrl: `${process.env.CWD}${avatarUrl}`,
      ...personObject,
    });

    // Add person Information
    if (personInformation) {
      console.log("check for person info");
      if (
        personInformation.quote !== "" ||
        personInformation.bio !== "" ||
        personInformation.dob !== null
      ) {
        console.log("WEL person info");
        personInformation.personId = newPerson.id;
        await this.personInformationService.create(personInformation);
      } else {
        console.log("NO person info");
      }
    }

    if (courseIds && courseIds.length > 0) {
      await this.addCoursesToPerson(newPerson.id, courseIds);
    }

    return newPerson;
  }

  async addCoursesToPerson(
    personId: number,
    courseIds: number[]
  ): Promise<Person> {
    const person = await this.personRepository.findOneOrFail(personId, {
      relations: ["courses"],
    });

    console.log("new person....", person);

    courseIds.forEach(async (courseId) => {
      const course = await this.coursesService.findOneById(courseId);

      if (!person.courses.includes(course)) person.courses.push(course);
    });

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
    } else return [];
    // return this.personInformationService.findByPersonId(personId);
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
    console.log("id...", id);

    const updatedPerson = await this.personRepository.save({
      id: id,
      avatarUrl: `${process.env.CWD}${avatarUrl}`,
      ...personObject,
    });

    // Update person Information
    if (personInformation) {
      console.log("personInformation...", personInformation);
      //TODO: check if personInformation exists
      const personInfoFromDb =
        await this.personInformationService.findByPersonId(id);
      if (personInfoFromDb) {
        console.log("gevonden!");
        this.personInformationService.update(
          personInfoFromDb.id,
          personInformation
        );
      } else {
        console.log("niet gevonden!");
        if (
          personInformation.quote !== "" ||
          personInformation.bio !== "" ||
          personInformation.dob !== null
        ) {
          personInformation.personId = updatedPerson.id;
          await this.personInformationService.create(personInformation);
        }
      }
    } else {
      console.log("no personInformation...");
    }

    if (courseIds && courseIds.length > 0) {
      await this.addCoursesToPerson(id, courseIds);
    }

    return updatedPerson;
  }

  async remove(id: number) {
    const person = await this.findOneById(id);
    return await this.personRepository.remove(person);
  }
}
