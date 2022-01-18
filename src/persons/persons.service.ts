import { Repository } from "typeorm";

import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Person } from "./entities/person.entity";
import { PersonInformation } from "src/person-informations/entities/person-information.entity";

import { CreatePersonInput } from "./dto/create-person.input";
import { UpdatePersonInput } from "./dto/update-person.input";
import { PersonInformationsService } from "src/person-informations/person-informations.service";
import { CreatePersonInformationInput } from "src/person-informations/dto/create-person-information.input";

@Injectable()
export class PersonsService {
  constructor(
    @InjectRepository(Person)
    private personRepository: Repository<Person>,
    private personInformationService: PersonInformationsService
  ) {}

  create(createPersonInput: CreatePersonInput): Promise<Person> {
    const newPerson = this.personRepository.create(createPersonInput);
    return this.personRepository.save(newPerson);
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
    // return this.personInformationService.findByPersonId(personId);
  }

  async update(
    id: number,
    updatePersonInput: UpdatePersonInput
  ): Promise<Person> {
    const { personInformation, ...rest } = updatePersonInput;

    if (personInformation) {
      const personInfoFromDb =
        await this.personInformationService.findByPersonId(id);
      this.personInformationService.update(
        personInfoFromDb.id,
        personInformation
      );
    }

    return this.personRepository.save({
      id: id,
      ...rest,
    });
  }

  async remove(id: number) {
    const person = await this.findOneById(id);
    return await this.personRepository.remove(person);
  }
}
