import { CreatePersonInformationInput } from './create-person-information.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class UpdatePersonInformationInput extends PartialType(CreatePersonInformationInput) {
  @IsNotEmpty()
  @IsString()
  @Field(() => String, { description: 'The quote for this person' })
  quote: string

  @IsNotEmpty()
  @IsString()
  @Field(() => String, { description: 'The bio for this person' })
  bio: string

  @Field({description: 'Date of birth for this person'})
  dob: string

  @Field(type => Int, { nullable: true })
  personId: number;
}
