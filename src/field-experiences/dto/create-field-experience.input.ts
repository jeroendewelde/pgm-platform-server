import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateFieldExperienceInput {
  @Field(() => String, { description: 'The duration of the field experience', nullable: true })
  duration?: string

  @Field(() => String, { description: 'The name of the company', nullable: true })
  company?: string

  @Field(() => String, { description: 'The performed function', nullable: true })
  function?: string

  @Field(() => String, { description: 'The description of the field experience', nullable: true })
  description?: string

  @Field(type => Int)
  personId: number;
}
