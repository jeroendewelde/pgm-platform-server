import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class LearlingLine {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
