import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateCompanyInput {
  @Field(() => String, { description: 'The name of the company' })
  name: string

  @Field(() => String, { description: 'The teaser image of the company', nullable: true })
  teaserImage?: string
}
