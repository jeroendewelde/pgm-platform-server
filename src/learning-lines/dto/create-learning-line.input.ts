import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateLearningLineInput {
  @Field(() => String, { description: 'The name of the learning line' })
  name: string

  @Field(() => String, { description: 'The color of the learning line'})
  color: string
}
