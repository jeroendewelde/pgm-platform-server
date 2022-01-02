import { CreateLearningLineInput } from './create-learning-line.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateLearningLineInput extends PartialType(CreateLearningLineInput) {
  @Field(() => String, { description: 'The name of the learning line' })
  name: string

  @Field(() => String, { description: 'The color of the learning line'})
  color: string
}
