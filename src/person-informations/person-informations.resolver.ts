import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from "@nestjs/graphql";

import { PersonInformation } from "./entities/person-information.entity";
import { CreatePersonInformationInput } from "./dto/create-person-information.input";
import { UpdatePersonInformationInput } from "./dto/update-person-information.input";
import { PersonInformationsService } from "./person-informations.service";
import { SocialMedia } from "src/social-medias/entities/social-media.entity";
import { FieldExperience } from "src/field-experiences/entities/field-experience.entity";

@Resolver(() => PersonInformation)
export class PersonInformationsResolver {
  constructor(
    private readonly personInformationsService: PersonInformationsService
  ) {}

  @Mutation(() => PersonInformation)
  createPersonInformation(
    @Args("createPersonInformationInput")
    createPersonInformationInput: CreatePersonInformationInput
  ): Promise<PersonInformation> {
    return this.personInformationsService.create(createPersonInformationInput);
  }

  @Query(() => [PersonInformation], { name: "personInformations" })
  findAll(): Promise<PersonInformation[]> {
    return this.personInformationsService.findAll();
  }

  @Query(() => PersonInformation, { name: "personInformation" })
  findOne(
    @Args("id", { type: () => Int }) id: number
  ): Promise<PersonInformation> {
    return this.personInformationsService.findOneById(id);
  }

  @Query(() => PersonInformation, { name: "personInformationByPersonId" })
  findByPersonId(
    @Args("id", { type: () => Int }) id: number
  ): Promise<PersonInformation> {
    return this.personInformationsService.findByPersonId(id);
  }

  @ResolveField((returns) => [FieldExperience])
  fieldExperiences(
    @Parent() personInformation: PersonInformation
  ): Promise<FieldExperience[]> {
    return this.personInformationsService.getFieldExperiences(
      personInformation.id
    );
  }

  @ResolveField((returns) => [SocialMedia])
  socialMedias(
    @Parent() personInformation: PersonInformation
  ): Promise<SocialMedia[]> {
    return this.personInformationsService.getSocialMedias(personInformation.id);
  }

  @Mutation(() => PersonInformation)
  updatePersonInformation(
    @Args("id", { type: () => Int })
    id: number,
    @Args("updatePersonInformationInput")
    updatePersonInformationInput: UpdatePersonInformationInput
  ): Promise<PersonInformation> {
    return this.personInformationsService.update(
      id,
      updatePersonInformationInput
    );
  }

  @Mutation(() => PersonInformation)
  removePersonInformation(
    @Args("id", { type: () => Int }) id: number
  ): Promise<PersonInformation> {
    const toBeDeletedPersonInformation =
      this.personInformationsService.findOneById(id);

    if (!toBeDeletedPersonInformation) return null;
    return this.personInformationsService.remove(id);
  }
}
