import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateInternInput {
  @Field(() => String, { description: 'The name of the function', nullable: true })
  function: string

  @Field(() => String, { description: 'The description of the function', nullable: true })
  description?: string

  @Field(() => String, { description: 'The year of the internship' })  
  year: string

  @Field(() => Int, { description: 'The ID of the person this intern belongs to' })
  studentId: number

  @Field(() => Int, { description: 'The ID of the company this intern worked at', nullable: true })
  companyId?: number
}
