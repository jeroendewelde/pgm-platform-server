import { Module } from "@nestjs/common";
import { TestimonialsService } from "./testimonials.service";
import { TestimonialsResolver } from "./testimonials.resolver";
import { Testimonial } from "./entities/testimonial.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([Testimonial])],
  providers: [TestimonialsResolver, TestimonialsService],
})
export class TestimonialsModule {}
