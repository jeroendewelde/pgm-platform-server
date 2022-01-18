import { CreatePersonInput } from "./create-person.input";
import { InputType, Field, Int, PartialType } from "@nestjs/graphql";
import { PersonType } from "src/scalars/person-type.scalar";
import { IsNotEmpty, IsString } from "class-validator";
import { PersonInformation } from "src/person-informations/entities/person-information.entity";
import { UpdatePersonInformationInput } from "src/person-informations/dto/update-person-information.input";

@InputType()
// export class UpdatePersonInput extends PartialType(CreatePersonInput) {
export class UpdatePersonInput {
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

  @Field(() => UpdatePersonInformationInput, {
    description: "The person Information",
    nullable: true,
  })
  personInformation?: UpdatePersonInformationInput;

  // Relations
  @Field(() => Int, {
    description: "The generation this student belongs to",
    nullable: true,
  })
  generationId?: number;
}
