import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateFieldExperienceInput } from "./dto/create-field-experience.input";
import { UpdateFieldExperienceInput } from "./dto/update-field-experience.input";
import { FieldExperience } from "./entities/field-experience.entity";

@Injectable()
export class FieldExperiencesService {
  constructor(
    @InjectRepository(FieldExperience)
    private readonly fieldExperienceRepository: Repository<FieldExperience>
  ) {}

  create(
    createFieldExperienceInput: CreateFieldExperienceInput
  ): Promise<FieldExperience> {
    const newFieldExperience = this.fieldExperienceRepository.create(
      createFieldExperienceInput
    );
    return this.fieldExperienceRepository.save(newFieldExperience);
  }

  findAll(): Promise<FieldExperience[]> {
    return this.fieldExperienceRepository.find();
  }

  findOneById(id: number): Promise<FieldExperience> {
    return this.fieldExperienceRepository.findOneOrFail(id);
  }

  findByPersonInformationId(
    personInformationId: number
  ): Promise<FieldExperience[]> {
    return this.fieldExperienceRepository.find({
      where: {
        personId: personInformationId,
      },
    });
  }

  update(
    id: number,
    updateFieldExperienceInput: UpdateFieldExperienceInput
  ): Promise<FieldExperience> {
    return this.fieldExperienceRepository.save({
      id: id,
      ...updateFieldExperienceInput,
    });
  }

  async remove(id: number): Promise<FieldExperience> {
    const fieldExperience = await this.findOneById(id);
    return this.fieldExperienceRepository.remove(fieldExperience);
  }
}
