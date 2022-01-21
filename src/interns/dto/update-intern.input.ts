import { CreateInternInput } from "./create-intern.input";
import { InputType, Field, Int, PartialType } from "@nestjs/graphql";

@InputType()
export class UpdateInternInput extends PartialType(CreateInternInput) {
  @Field(() => Int, { description: "The ID of the intern", nullable: true })
  id: number;

  @Field(() => String, {
    description: "The name of the function",
    nullable: true,
  })
  function: string;

  @Field(() => String, {
    description: "The description of the function",
    nullable: true,
  })
  description?: string;

  @Field(() => String, { description: "The year of the internship" })
  year: string;

  @Field(() => Int, {
    description: "The ID of the person this intern belongs to",
  })
  studentId: number;

  @Field(() => Int, {
    description: "The ID of the company this intern worked at",
    nullable: true,
  })
  companyId?: number;
}
