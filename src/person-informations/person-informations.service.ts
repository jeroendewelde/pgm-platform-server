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

  async create(
    createPersonInformationInput: CreatePersonInformationInput
  ): Promise<PersonInformation> {
    let { fieldExperiences, socialMedias, ...personInformation } =
      createPersonInformationInput;

    const newPersonInformation = await this.personInformationRepository.create(
      personInformation
    );

    const newSavedPersonInformation =
      await this.personInformationRepository.save(personInformation);

    if (fieldExperiences.length > 0) {
      fieldExperiences.map(async (fieldExperience) => {
        fieldExperience.personId = newSavedPersonInformation.id;
        await this.fieldExperienceService.create(fieldExperience);
      });
    }

    if (socialMedias.length > 0) {
      socialMedias.map(async (socialMedia) => {
        socialMedia.personId = newSavedPersonInformation.id;
        await this.socialMediaService.create(socialMedia);
      });
    }

    return newSavedPersonInformation;
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
    let personInfoFromDb = await this.personInformationRepository.findOneOrFail(
      id,
      {
        relations: ["socialMedias", "fieldExperiences"],
      }
    );

    personInfoFromDb?.socialMedias.forEach(async (socialMedia) => {
      await this.socialMediaService.remove(socialMedia.id);
    });

    personInfoFromDb?.fieldExperiences.forEach(async (fieldExperience) => {
      await this.fieldExperienceService.remove(fieldExperience.id);
    });

    const updatedPersonInformation =
      await this.personInformationRepository.save({
        id: id,
        ...updatePersonInformationInput,
      });

    return updatedPersonInformation;
  }

  async remove(id: number): Promise<PersonInformation> {
    const personInformation = await this.findOneById(id);
    return this.personInformationRepository.remove(personInformation);
  }
}
