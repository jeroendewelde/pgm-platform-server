import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";

import { FieldExperience } from "./entities/field-experience.entity";
import { CreateFieldExperienceInput } from "./dto/create-field-experience.input";
import { UpdateFieldExperienceInput } from "./dto/update-field-experience.input";
import { FieldExperiencesService } from "./field-experiences.service";

@Resolver(() => FieldExperience)
export class FieldExperiencesResolver {
  constructor(
    private readonly fieldExperiencesService: FieldExperiencesService
  ) {}

  @Mutation(() => FieldExperience)
  createFieldExperience(
    @Args("createFieldExperienceInput")
    createFieldExperienceInput: CreateFieldExperienceInput
  ): Promise<FieldExperience> {
    return this.fieldExperiencesService.create(createFieldExperienceInput);
  }

  @Query(() => [FieldExperience], { name: "fieldExperiences" })
  findAll(): Promise<FieldExperience[]> {
    return this.fieldExperiencesService.findAll();
  }

  @Query(() => FieldExperience, { name: "fieldExperience" })
  findOne(
    @Args("id", { type: () => String }) id: string
  ): Promise<FieldExperience> {
    return this.fieldExperiencesService.findOneById(id);
  }

  @Query(() => [FieldExperience], { name: "fieldExperiencesByPersonId" })
  findAllByPersonId(
    @Args("id", { type: () => Int }) id: number
  ): Promise<FieldExperience[]> {
    return this.fieldExperiencesService.findByPersonInformationId(id);
  }

  @Mutation(() => FieldExperience)
  updateFieldExperience(
    @Args("id", { type: () => String })
    id: string,
    @Args("updateFieldExperienceInput")
    updateFieldExperienceInput: UpdateFieldExperienceInput
  ): Promise<FieldExperience> {
    return this.fieldExperiencesService.update(id, updateFieldExperienceInput);
  }

  @Mutation(() => FieldExperience)
  removeFieldExperience(
    @Args("id", { type: () => String }) id: string
  ): Promise<FieldExperience> {
    const toBeDeletedFieldExperience =
      this.fieldExperiencesService.findOneById(id);

    if (!toBeDeletedFieldExperience) return null;
    return this.fieldExperiencesService.remove(id);
  }
}
