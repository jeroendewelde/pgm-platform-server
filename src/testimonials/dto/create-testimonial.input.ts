import { InputType, Int, Field } from "@nestjs/graphql";

@InputType()
export class CreateTestimonialInput {
  @Field(() => String, { description: "The quote" })
  quote: string;

  @Field(() => String, {
    description: "The name of the writer",
    nullable: true,
  })
  name?: string;

  @Field(() => String, { description: "The related company", nullable: true })
  company?: string;
}
