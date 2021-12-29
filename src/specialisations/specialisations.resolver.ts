import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SpecialisationsService } from './specialisations.service';
import { Specialisation } from './entities/specialisation.entity';
import { CreateSpecialisationInput } from './dto/create-specialisation.input';
import { UpdateSpecialisationInput } from './dto/update-specialisation.input';

@Resolver(() => Specialisation)
export class SpecialisationsResolver {
  constructor(private readonly specialisationsService: SpecialisationsService) {}

  @Mutation(() => Specialisation)
  createSpecialisation(@Args('createSpecialisationInput') createSpecialisationInput: CreateSpecialisationInput): Promise<Specialisation> {
    return this.specialisationsService.create(createSpecialisationInput);
  }

  @Query(() => [Specialisation], { name: 'specialisations' })
  findAll(): Promise<Specialisation[]> {
    return this.specialisationsService.findAll();
  }

  @Query(() => Specialisation, { name: 'specialisation' })
  findOne(@Args('id', { type: () => Int }) id: number): Promise<Specialisation> {
    return this.specialisationsService.findOneById(id);
  }

  @Mutation(() => Specialisation)
  updateSpecialisation(
    @Args('id', { type: () => Int }) 
    id: number,
    @Args('updateSpecialisationInput') 
    updateSpecialisationInput: UpdateSpecialisationInput
  ): Promise<Specialisation> {
    return this.specialisationsService.update(id, updateSpecialisationInput);
  }

  @Mutation(() => Specialisation)
  removeSpecialisation(@Args('id', { type: () => Int }) id: number): Promise<Specialisation> {
    const toBeDeletedSpecialisation = this.specialisationsService.findOneById(id);

    if(!toBeDeletedSpecialisation) return null
    return this.specialisationsService.remove(id);
  }
}
