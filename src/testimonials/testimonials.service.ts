import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateTestimonialInput } from "./dto/create-testimonial.input";
import { UpdateTestimonialInput } from "./dto/update-testimonial.input";
import { Testimonial } from "./entities/testimonial.entity";

@Injectable()
export class TestimonialsService {
  constructor(
    @InjectRepository(Testimonial)
    private readonly testimonialRepository: Repository<Testimonial>
  ) {}

  create(createTestimonialInput: CreateTestimonialInput): Promise<Testimonial> {
    return this.testimonialRepository.save(createTestimonialInput);
  }

  findAll(): Promise<Testimonial[]> {
    return this.testimonialRepository.find();
  }

  findOneById(id: number): Promise<Testimonial> {
    return this.testimonialRepository.findOneOrFail(id);
  }

  update(
    id: number,
    updateTestimonialInput: UpdateTestimonialInput
  ): Promise<Testimonial> {
    return this.testimonialRepository.save({
      id: id,
      ...updateTestimonialInput,
    });
  }

  async remove(id: number): Promise<Testimonial> {
    const toBeDeletedTestimonial = await this.findOneById(id);
    await this.testimonialRepository.remove(toBeDeletedTestimonial);

    return toBeDeletedTestimonial;
  }
}
