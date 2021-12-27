import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { LearlingLinesService } from './learling-lines.service';
import { LearlingLine } from './entities/learling-line.entity';
import { CreateLearlingLineInput } from './dto/create-learling-line.input';
import { UpdateLearlingLineInput } from './dto/update-learling-line.input';

@Resolver(() => LearlingLine)
export class LearlingLinesResolver {
  constructor(private readonly learlingLinesService: LearlingLinesService) {}

  @Mutation(() => LearlingLine)
  createLearlingLine(@Args('createLearlingLineInput') createLearlingLineInput: CreateLearlingLineInput) {
    return this.learlingLinesService.create(createLearlingLineInput);
  }

  @Query(() => [LearlingLine], { name: 'learlingLines' })
  findAll() {
    return this.learlingLinesService.findAll();
  }

  @Query(() => LearlingLine, { name: 'learlingLine' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.learlingLinesService.findOne(id);
  }

  @Mutation(() => LearlingLine)
  updateLearlingLine(@Args('updateLearlingLineInput') updateLearlingLineInput: UpdateLearlingLineInput) {
    return this.learlingLinesService.update(updateLearlingLineInput.id, updateLearlingLineInput);
  }

  @Mutation(() => LearlingLine)
  removeLearlingLine(@Args('id', { type: () => Int }) id: number) {
    return this.learlingLinesService.remove(id);
  }
}
