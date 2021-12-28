import { InputType, Int, Field } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';

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
}
