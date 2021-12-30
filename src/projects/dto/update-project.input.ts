import { CreateProjectInput } from './create-project.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { ManyToOne } from 'typeorm';

@InputType()
export class UpdateProjectInput extends PartialType(CreateProjectInput) {
  @IsNotEmpty()
  @IsString()
  @Field(() => String, { description: 'The name of the project' })
  name: string

  @IsNotEmpty()
  @IsString()
  @Field(() => String, { description: 'The teaser text for the project' })
  teaserText: string
  
  @IsNotEmpty()
  @IsString()
  @Field(() => String, { description: 'The full description of the project' })
  body: string

  @IsNotEmpty()
  @IsString()
  @MinLength(9)
  @MaxLength(9)
  @Matches(/20[0-9]{2}-20[0-9]{2}/, {message: "The academic year must be in format '2020-2021'"})
  @Field(() => String, { description: 'The academic year of the project' })
  academicYear: string

  @Field(() => [String], { description: 'List of tags for the project', nullable: true })
  tags?: string[]

  @Field(() => Int, { description: 'The ID of the course this project was made for' })
  courseId: number
}
