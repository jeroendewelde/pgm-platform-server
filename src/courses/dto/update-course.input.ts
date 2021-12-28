import { CreateCourseInput } from './create-course.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsNumber, IsInt, Min, Max } from 'class-validator';

@InputType()
export class UpdateCourseInput extends PartialType(CreateCourseInput) {
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
}
