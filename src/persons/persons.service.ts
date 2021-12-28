import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Person } from './entities/person.entity';
import { PersonInformation } from 'src/person-informations/entities/person-information.entity';

import { CreatePersonInput } from './dto/create-person.input';
import { UpdatePersonInput } from './dto/update-person.input';
import { PersonInformationsService } from 'src/person-informations/person-informations.service';

@Injectable()
export class PersonsService {
  constructor(
    @InjectRepository(Person)
    private personRepository: Repository<Person>,
    private personInformationService: PersonInformationsService,
  ) {}

  create(createPersonInput: CreatePersonInput): Promise<Person> {
    const newPerson = this.personRepository.create(createPersonInput);
    return this.personRepository.save(newPerson);
  }

  findAll(): Promise<Person[]> {
    return this.personRepository.find();
  }

  findOneById(id: number): Promise<Person> {
    return this.personRepository.findOneOrFail(id);
  }

  getPersonInformation(personId: number): Promise<PersonInformation> {
    return this.personInformationService.findByPersonId(personId);
  }


  update(id: number, updatePersonInput: UpdatePersonInput): Promise<Person> {
    return this.personRepository.save({
      id: id,
      ...updatePersonInput,
    })
  }

  async remove(id: number) {
    const person = await this.findOneById(id);
    return this.personRepository.remove(person);
  }
}
