import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SpecialisationsService } from './specialisations.service';
import { Specialisation } from './entities/specialisation.entity';
import { CreateSpecialisationInput } from './dto/create-specialisation.input';
import { UpdateSpecialisationInput } from './dto/update-specialisation.input';

@Resolver(() => Specialisation)
export class SpecialisationsResolver {
  constructor(private readonly specialisationsService: SpecialisationsService) {}

  @Mutation(() => Specialisation)
  createSpecialisation(@Args('createSpecialisationInput') createSpecialisationInput: CreateSpecialisationInput) {
    return this.specialisationsService.create(createSpecialisationInput);
  }

  @Query(() => [Specialisation], { name: 'specialisations' })
  findAll() {
    return this.specialisationsService.findAll();
  }

  @Query(() => Specialisation, { name: 'specialisation' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.specialisationsService.findOne(id);
  }

  @Mutation(() => Specialisation)
  updateSpecialisation(@Args('updateSpecialisationInput') updateSpecialisationInput: UpdateSpecialisationInput) {
    return this.specialisationsService.update(updateSpecialisationInput.id, updateSpecialisationInput);
  }

  @Mutation(() => Specialisation)
  removeSpecialisation(@Args('id', { type: () => Int }) id: number) {
    return this.specialisationsService.remove(id);
  }
}
