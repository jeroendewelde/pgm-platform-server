import { CreateCompanyInput } from "./create-company.input";
import { InputType, Field, Int, PartialType } from "@nestjs/graphql";
import { UpdateInternInput } from "src/interns/dto/update-intern.input";
import { Intern } from "src/interns/entities/intern.entity";

@InputType()
export class UpdateCompanyInput extends PartialType(CreateCompanyInput) {
  @Field(() => Int, { description: "The ID of the company", nullable: true })
  id?: number;

  @Field(() => String, { description: "The name of the company" })
  name: string;

  @Field(() => String, {
    description: "The teaser image of the company",
    nullable: true,
  })
  teaserImage?: string;

  // Relations
  @Field(() => [UpdateInternInput], {
    description: "The list of interns who worked at this company",
    nullable: true,
  })
  interns?: Intern[];
}
