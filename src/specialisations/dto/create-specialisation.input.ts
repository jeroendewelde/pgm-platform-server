import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateSpecialisationInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
