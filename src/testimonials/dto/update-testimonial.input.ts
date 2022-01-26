import { CreateTestimonialInput } from "./create-testimonial.input";
import { InputType, Field, Int, PartialType } from "@nestjs/graphql";

@InputType()
export class UpdateTestimonialInput extends PartialType(
  CreateTestimonialInput
) {}
