import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { GenerationsService } from './generations.service';
import { Generation } from './entities/generation.entity';
import { CreateGenerationInput } from './dto/create-generation.input';
import { UpdateGenerationInput } from './dto/update-generation.input';

@Resolver(() => Generation)
export class GenerationsResolver {
  constructor(private readonly generationsService: GenerationsService) {}

  @Mutation(() => Generation)
  createGeneration(@Args('createGenerationInput') createGenerationInput: CreateGenerationInput): Promise<Generation> {
    return this.generationsService.create(createGenerationInput);
  }

  @Query(() => [Generation], { name: 'generations' })
  findAll(): Promise<Generation[]> {
    return this.generationsService.findAll();
  }

  @Query(() => Generation, { name: 'generation' })
  findOne(@Args('id', { type: () => Int }) id: number): Promise<Generation> {
    return this.generationsService.findOneById(id);
  }

  @Mutation(() => Generation)
  updateGeneration(
    @Args('id', { type: () => Int }) 
    id: number,
    @Args('updateGenerationInput') 
    updateGenerationInput: UpdateGenerationInput
  ): Promise<Generation> {
    return this.generationsService.update(id, updateGenerationInput);
  }

  @Mutation(() => Generation)
  removeGeneration(@Args('id', { type: () => Int }) id: number): Promise<Generation> {
    const toBeDeletedGeneration = this.generationsService.findOneById(id);

    if(!toBeDeletedGeneration) return null
    return this.generationsService.remove(id);
  }
}
