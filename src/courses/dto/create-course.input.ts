import { InputType, Int, Field } from "@nestjs/graphql";
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  Matches,
  Max,
  MaxLength,
  Min,
  MinLength,
} from "class-validator";
import { CreatePersonInput } from "src/persons/dto/create-person.input";
import { Person } from "src/persons/entities/person.entity";

@InputType()
export class CreateCourseInput {
  @IsNotEmpty()
  @IsString()
  @Field(() => String, { description: "The name of the course" })
  name: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String, { description: "The description of the course" })
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @Min(1)
  @Max(8)
  @Field(() => Int, { description: "The number of the term" })
  term: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(9)
  @MaxLength(9)
  @Matches(/20[0-9]{2}-20[0-9]{2}/, {
    message: "The academic year must be in format '2020-2021'",
  })
  @Field(() => String, { description: "The academic year of the project" })
  academicYear: string;

  @Field(() => String, {
    description: "The teaser image of the course",
    nullable: true,
  })
  teaserImage?: string;

  @Field(() => [String], {
    description: "List of tags for the course",
    nullable: true,
  })
  tags?: string[];

  @Field(() => Int, {
    description: "The ID of the learning line this project belongs to",
  })
  learningLineId: number;

  @Field(() => Int, {
    description: "The ID of the specialisation this project belongs to",
    nullable: true,
  })
  specialisationId?: number = null;

  @Field(() => [Number], {
    description: "List of teacherIds for the course",
    nullable: true,
  })
  teacherIds?: number[];
}
