import { CreateCourseInput } from "./create-course.input";
import { InputType, Field, Int, PartialType } from "@nestjs/graphql";
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsInt,
  Min,
  Max,
  Matches,
  MaxLength,
  MinLength,
} from "class-validator";

@InputType()
export class UpdateCourseInput extends PartialType(CreateCourseInput) {
  // @IsNotEmpty()
  // @IsString()
  @Field(() => String, {
    description: "The name of the course",
    nullable: true,
  })
  name?: string;

  // @IsNotEmpty()
  // @IsString()
  @Field(() => String, {
    description: "The description of the course",
    nullable: true,
  })
  description?: string;

  // @IsNotEmpty()
  // @IsNumber()
  // @IsInt()
  // @Min(1)
  // @Max(8)
  @Field(() => Int, { description: "The number of the term", nullable: true })
  term?: number;

  // @IsNotEmpty()
  // @IsString()
  // @MinLength(9)
  // @MaxLength(9)
  // @Matches(/20[0-9]{2}-20[0-9]{2}/, {message: "The academic year must be in format '2020-2021'"})
  @Field(() => String, {
    description: "The academic year of the project",
    nullable: true,
  })
  academicYear?: string;

  @Field(() => [String], {
    description: "List of tags for the course",
    nullable: true,
  })
  tags?: string[];

  @Field(() => Int, {
    description: "The ID of the learning line this project belongs to",
    nullable: true,
  })
  learningLineId?: number;

  @Field(() => Int, {
    description: "The ID of the specialisation this project belongs to",
    nullable: true,
  })
  specialisationId?: number = null;
}
