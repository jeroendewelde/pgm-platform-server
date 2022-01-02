import { CreateCompanyInput } from './create-company.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateCompanyInput extends PartialType(CreateCompanyInput) {
  @Field(() => String, { description: 'The name of the company' })
  name: string

  @Field(() => String, { description: 'The teaser image of the company', nullable: true })
  teaserImage?: string
}
