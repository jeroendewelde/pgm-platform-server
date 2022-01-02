import { CreateFieldExperienceInput } from './create-field-experience.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateFieldExperienceInput extends PartialType(CreateFieldExperienceInput) {
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
