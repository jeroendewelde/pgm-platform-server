import { Repository } from "typeorm";

import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { CreatePersonInformationInput } from "./dto/create-person-information.input";
import { UpdatePersonInformationInput } from "./dto/update-person-information.input";
import { PersonInformation } from "./entities/person-information.entity";
import { SocialMedia } from "src/social-medias/entities/social-media.entity";
import { SocialMediasService } from "src/social-medias/social-medias.service";
import { FieldExperience } from "src/field-experiences/entities/field-experience.entity";
import { FieldExperiencesService } from "src/field-experiences/field-experiences.service";

@Injectable()
export class PersonInformationsService {
  constructor(
    @InjectRepository(PersonInformation)
    private personInformationRepository: Repository<PersonInformation>,
    private fieldExperienceService: FieldExperiencesService,
    private socialMediaService: SocialMediasService
  ) {}

  create(
    createPersonInformationInput: CreatePersonInformationInput
  ): Promise<PersonInformation> {
    const newPersonInformation = this.personInformationRepository.create(
      createPersonInformationInput
    );
    return this.personInformationRepository.save(newPersonInformation);
  }

  findAll(): Promise<PersonInformation[]> {
    return this.personInformationRepository.find();
  }

  findOneById(id: number): Promise<PersonInformation> {
    return this.personInformationRepository.findOne(id);
  }

  findByPersonId(personId: number): Promise<PersonInformation> {
    return this.personInformationRepository.findOne({
      where: {
        personId: personId,
      },
    });
  }

  getFieldExperiences(personInformationId: number): Promise<FieldExperience[]> {
    return this.fieldExperienceService.findByPersonInformationId(
      personInformationId
    );
  }

  getSocialMedias(personInformationId: number): Promise<SocialMedia[]> {
    return this.socialMediaService.findByPersonInformationId(
      personInformationId
    );
  }

  async update(
    id: number,
    updatePersonInformationInput: UpdatePersonInformationInput
  ): Promise<PersonInformation> {
    const update = await this.personInformationRepository.save({
      id: id,
      ...updatePersonInformationInput,
    });
    console.log("....update...", update);
    return update;
  }

  async remove(id: number): Promise<PersonInformation> {
    const personInformation = await this.findOneById(id);
    return this.personInformationRepository.remove(personInformation);
  }
}
