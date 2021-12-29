import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';

import { LearningLine } from './entities/learning-line.entity';

import { CreateLearningLineInput } from './dto/create-learning-line.input';
import { UpdateLearningLineInput } from './dto/update-learning-line.input';

import { LearningLinesService } from './learning-lines.service';

@Resolver(() => LearningLine)
export class LearningLinesResolver {
  constructor(private readonly learningLinesService: LearningLinesService) {}

  @Mutation(() => LearningLine)
  createLearningLine(@Args('createLearningLineInput') createLearningLineInput: CreateLearningLineInput): Promise<LearningLine> {
    return this.learningLinesService.create(createLearningLineInput);
  }

  @Query(() => [LearningLine], { name: 'learningLines' })
  findAll(): Promise<LearningLine[]> {
    return this.learningLinesService.findAll();
  }

  @Query(() => LearningLine, { name: 'learningLine' })
  findOne(@Args('id', { type: () => Int }) id: number): Promise<LearningLine> {
    return this.learningLinesService.findOneById(id);
  }

  @Mutation(() => LearningLine)
  updateLearningLine(
    @Args('id', { type: () => Int }) 
    id: number,
    @Args('updateLearningLineInput') 
    updateLearningLineInput: UpdateLearningLineInput
    ): Promise<LearningLine> {
    return this.learningLinesService.update(id, updateLearningLineInput);
  }

  @Mutation(() => LearningLine)
  removeLearningLine(@Args('id', { type: () => Int }) id: number): Promise<LearningLine> {
    const toBeDeletedLearningLine = this.learningLinesService.findOneById(id);

    if(!toBeDeletedLearningLine) return null
    return this.learningLinesService.remove(id)
  }
}
