import { Repository } from "typeorm";

import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { CreateSocialMediaInput } from "./dto/create-social-media.input";
import { UpdateSocialMediaInput } from "./dto/update-social-media.input";
import { SocialMedia } from "./entities/social-media.entity";

@Injectable()
export class SocialMediasService {
  constructor(
    @InjectRepository(SocialMedia)
    private socialMediaRepository: Repository<SocialMedia>
  ) {}

  create(createSocialMediaInput: CreateSocialMediaInput): Promise<SocialMedia> {
    const newSocialMedia = this.socialMediaRepository.create(
      createSocialMediaInput
    );
    return this.socialMediaRepository.save(newSocialMedia);
  }

  findAll(): Promise<SocialMedia[]> {
    return this.socialMediaRepository.find();
  }

  findOneById(id: string): Promise<SocialMedia> {
    return this.socialMediaRepository.findOneOrFail(id);
  }

  findByPersonInformationId(
    personInformationId: number
  ): Promise<SocialMedia[]> {
    return this.socialMediaRepository.find({
      where: {
        personId: personInformationId,
      },
    });
  }

  update(id: string, updateSocialMediaInput: UpdateSocialMediaInput) {
    return this.socialMediaRepository.save({
      id: id,
      ...updateSocialMediaInput,
    });
  }

  async remove(id: string) {
    const socialMedia = await this.findOneById(id);
    const socialMediaErased = await this.socialMediaRepository.remove(
      socialMedia
    );
    // await this.socialMediaRepository.save(socialMediaErased);
    console.log("erased....", socialMediaErased);
    return socialMediaErased;
  }

  async removeList(socialMedias: SocialMedia[]) {
    const socialMediaErased = await this.socialMediaRepository.remove(
      socialMedias
    );
    return socialMediaErased;
  }
}
