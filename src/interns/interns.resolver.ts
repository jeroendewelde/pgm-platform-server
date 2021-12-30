import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { InternsService } from './interns.service';
import { Intern } from './entities/intern.entity';
import { CreateInternInput } from './dto/create-intern.input';
import { UpdateInternInput } from './dto/update-intern.input';
import { Person } from 'src/persons/entities/person.entity';
import { PersonsService } from 'src/persons/persons.service';

@Resolver(() => Intern)
export class InternsResolver {
  constructor(
    private readonly internsService: InternsService,
    private readonly personsService: PersonsService
  ) {}

  @Mutation(() => Intern)
  createIntern(@Args('createInternInput') createInternInput: CreateInternInput): Promise<Intern> {
    return this.internsService.create(createInternInput);
  }

  @Query(() => [Intern], { name: 'interns' })
  findAll(): Promise<Intern[]> {
    return this.internsService.findAll();
  }

  @ResolveField(() => Person)
  student(@Parent() intern: Intern): Promise<Person> {
    return this.personsService.findOneById(intern.studentId);
  }
    

  @Query(() => Intern, { name: 'intern' })
  findOne(@Args('id', { type: () => Int }) id: number): Promise<Intern> {
    return this.internsService.findOneById(id);
  }



  @Mutation(() => Intern)
  updateIntern(
    @Args('id', { type: () => Int }) 
    id: number,
    @Args('updateInternInput') 
    updateInternInput: UpdateInternInput
  ): Promise<Intern> {
    return this.internsService.update(id, updateInternInput);
  }

  @Mutation(() => Intern)
  removeIntern(@Args('id', { type: () => Int }) id: number): Promise<Intern> {
    const toBeDeletedIntern = this.internsService.findOneById(id);

    if(!toBeDeletedIntern) return null
    return this.internsService.remove(id);
  }
}
