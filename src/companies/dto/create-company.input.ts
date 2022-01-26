import { InputType, Int, Field } from "@nestjs/graphql";
import { CreateInternInput } from "src/interns/dto/create-intern.input";
import { Intern } from "src/interns/entities/intern.entity";
// import { Upload } from "src/scalars/upload.scalar";
import { File } from "src/scalars/Upload";
// import { File } from "graphql-upload";
import { GraphQLUpload, FileUpload } from "graphql-upload";
import { Upload } from "src/scalars/upload.scalar";
// import { Upload } from "src/scalars/upload.scalar";

@InputType()
export class CreateCompanyInput {
  @Field(() => String, { description: "The name of the company" })
  name: string;

  @Field(() => String, {
    description: "The teaser image of the company",
    nullable: true,
  })
  teaserImage?: string;

  // Relations
  @Field(() => [CreateInternInput], {
    description: "The list of interns who worked at this company",
    nullable: true,
  })
  interns?: Intern[];
}
