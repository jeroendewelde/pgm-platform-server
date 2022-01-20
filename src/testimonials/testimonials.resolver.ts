import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { TestimonialsService } from "./testimonials.service";
import { Testimonial } from "./entities/testimonial.entity";
import { CreateTestimonialInput } from "./dto/create-testimonial.input";
import { UpdateTestimonialInput } from "./dto/update-testimonial.input";

@Resolver(() => Testimonial)
export class TestimonialsResolver {
  constructor(private readonly testimonialsService: TestimonialsService) {}

  @Mutation(() => Testimonial)
  createTestimonial(
    @Args("createTestimonialInput")
    createTestimonialInput: CreateTestimonialInput
  ) {
    return this.testimonialsService.create(createTestimonialInput);
  }

  @Query(() => [Testimonial], { name: "testimonials" })
  findAll() {
    return this.testimonialsService.findAll();
  }

  @Query(() => Testimonial, { name: "testimonial" })
  findOne(@Args("id", { type: () => Int }) id: number) {
    return this.testimonialsService.findOneById(id);
  }

  @Mutation(() => Testimonial)
  updateTestimonial(
    @Args("id", { type: () => Int })
    id: number,
    @Args("updateTestimonialInput")
    updateTestimonialInput: UpdateTestimonialInput
  ) {
    return this.testimonialsService.update(id, updateTestimonialInput);
  }

  @Mutation(() => Testimonial)
  removeTestimonial(@Args("id", { type: () => Int }) id: number) {
    const toBeDeletedTestimonial = this.testimonialsService.findOneById(id);

    if (!toBeDeletedTestimonial) return null;
    this.testimonialsService.remove(id);

    return toBeDeletedTestimonial;
  }
}
