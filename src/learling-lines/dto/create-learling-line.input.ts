import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateLearlingLineInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
