import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString, MinLength, MaxLength, Matches } from 'class-validator';

@InputType()
export class CreateSpecialisationInput {
  @IsNotEmpty()
  @IsString()
  @Field(() => String, { description: 'The name of the specialisation' })
  name: string

  @IsNotEmpty()
  @IsString()
  @MinLength(9)
  @MaxLength(9)
  @Matches(/20[0-9]{2}-20[0-9]{2}/, {message: "The academic year must be in format '2019-2021'"})
  @Field(() => String, { description: 'The academic year of this specialisation' })
  academicYear: string
}
