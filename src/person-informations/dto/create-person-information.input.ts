import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreatePersonInformationInput {
  @IsNotEmpty()
  @IsString()
  @Field(() => String, { description: 'The quote for this person', nullable: true })
  quote?: string

  @IsNotEmpty()
  @IsString()
  @Field(() => String, { description: 'The bio for this person', nullable: true })
  bio?: string

  @Field({description: 'Date of birth for this person', nullable: true })
  dob?: string

  @Field(type => Int, { nullable: true })
  personId: number;  
}
