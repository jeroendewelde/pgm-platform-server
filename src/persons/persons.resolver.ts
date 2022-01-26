import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  Parent,
  ResolveField,
} from "@nestjs/graphql";

import { Person } from "./entities/person.entity";
import { PersonInformation } from "src/person-informations/entities/person-information.entity";

import { CreatePersonInput } from "./dto/create-person.input";
import { UpdatePersonInput } from "./dto/update-person.input";
import { PersonsService } from "./persons.service";
import { Course } from "src/courses/entities/course.entity";

@Resolver(() => Person)
export class PersonsResolver {
  constructor(private readonly personsService: PersonsService) {}

  @Mutation(() => Person)
  createPerson(
    @Args("createPersonInput") createPersonInput: CreatePersonInput
  ): Promise<Person> {
    return this.personsService.create(createPersonInput);
  }

  @Query(() => [Person], { name: "persons" })
  findAll(): Promise<Person[]> {
    return this.personsService.findAll();
  }

  @Query(() => Person, { name: "person" })
  findOne(@Args("id", { type: () => Int }) id: number): Promise<Person> {
    return this.personsService.findOneById(id);
  }

  @Query(() => [Person], { name: "students" })
  findAllStudents(): Promise<Person[]> {
    return this.personsService.findAllStudents();
  }

  @Query(() => [Person], { name: "teachers" })
  findAllTeachers(): Promise<Person[]> {
    return this.personsService.findAllTeachers();
  }

  @ResolveField((returns) => PersonInformation)
  personInformation(@Parent() person: Person): Promise<PersonInformation | {}> {
    return this.personsService.getPersonInformation(person.id);
  }

  @ResolveField((returns) => [Course])
  courses(@Parent() person: Person): Promise<Course[]> {
    return this.personsService.getCourses(person.id);
  }

  @Mutation(() => Person)
  updatePerson(
    @Args("id", { type: () => Int })
    id: number,
    @Args("updatePersonInput")
    updatePersonInput: UpdatePersonInput
  ): Promise<Person> {
    return this.personsService.update(id, updatePersonInput);
  }

  @Mutation(() => Person)
  removePerson(@Args("id", { type: () => Int }) id: number): Promise<Person> {
    const toBeDeletedPerson = this.personsService.findOneById(id);

    if (!toBeDeletedPerson) return null;
    return this.personsService.remove(id);
  }
}
