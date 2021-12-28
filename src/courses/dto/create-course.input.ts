import { InputType, Int, Field } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, IsNumber, IsString, Matches, Max, MaxLength, Min, MinLength } from 'class-validator';

@InputType()
export class CreateCourseInput {
  @IsNotEmpty()
  @IsString()
  @Field(() => String, { description: 'The name of the course' })
  name: string

  @IsNotEmpty()
  @IsString()
  @Field(() => String, { description: 'The description of the course' })
  description: string

  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @Min(1)
  @Max(8)
  @Field(() => Int, { description: 'The number of the term' })
  term: number

  @IsNotEmpty()
  @IsString()
  @MinLength(9)
  @MaxLength(9)
  @Matches(/20[0-9]{2}-20[0-9]{2}/, {message: "The academic year must be in format '2020-2021'"})
  @Field(() => String, { description: 'The academic year of the project' })
  academicYear: string
}
