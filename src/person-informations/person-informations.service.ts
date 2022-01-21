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
import { KnownFragmentNamesRule } from "graphql";

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

    const newPersonInformation = await this.personInformationRepository.save(
      personInformation
    );

    if (fieldExperiences.length > 0) {
      console.log("wél field experiences");
      fieldExperiences.map(async (fieldExperience) => {
        fieldExperience.personId = newPersonInformation.id;
        await this.fieldExperienceService.create(fieldExperience);
      });
    } else console.log("no field experiences");

    if (socialMedias.length > 0) {
      console.log("wél socual meidas", socialMedias);
      socialMedias.map(async (socialMedia) => {
        socialMedia.personId = newPersonInformation.id;
        const created = await this.socialMediaService.create(socialMedia);
        console.log("created....", created);
      });
    } else console.log("no social media");
    return newPersonInformation;
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
    const personInfoFromDb =
      await this.personInformationRepository.findOneOrFail(id, {
        relations: ["socialMedias", "fieldExperiences"],
      });

    if (personInfoFromDb.socialMedias.length > 0) {
      await this.socialMediaService.removeList(personInfoFromDb.socialMedias);
    }

    if (personInfoFromDb.fieldExperiences.length > 0) {
      await this.fieldExperienceService.removeList(
        personInfoFromDb.fieldExperiences
      );
    }

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
