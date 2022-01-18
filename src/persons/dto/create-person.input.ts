import { InputType, Int, Field } from "@nestjs/graphql";
import { PersonType } from "src/scalars/person-type.scalar";

import { IsNotEmpty, IsString } from "class-validator";
import { PersonInformation } from "src/person-informations/entities/person-information.entity";
import { CreatePersonInformationInput } from "src/person-informations/dto/create-person-information.input";

@InputType()
export class CreatePersonInput {
  @IsNotEmpty()
  @IsString()
  @Field(() => String, { description: "The first name of the person" })
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String, { description: "The last name of the person" })
  lastName: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => PersonType, { description: "The type of the person" })
  type: PersonType;

  // Relations
  @Field(() => Int, { nullable: true })
  generationId?: number;

  @Field(() => [Number], {
    description: "List of courses for the teacher",
    nullable: true,
  })
  courseIds?: number[];

  @Field(() => CreatePersonInformationInput, { nullable: true })
  personInformation?: CreatePersonInformationInput;
}
