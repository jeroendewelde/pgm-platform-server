import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";

import { SocialMedia } from "./entities/social-media.entity";
import { CreateSocialMediaInput } from "./dto/create-social-media.input";
import { UpdateSocialMediaInput } from "./dto/update-social-media.input";
import { SocialMediasService } from "./social-medias.service";

@Resolver(() => SocialMedia)
export class SocialMediasResolver {
  constructor(private readonly socialMediasService: SocialMediasService) {}

  @Mutation(() => SocialMedia)
  createSocialMedia(
    @Args("createSocialMediaInput")
    createSocialMediaInput: CreateSocialMediaInput
  ) {
    return this.socialMediasService.create(createSocialMediaInput);
  }

  @Query(() => [SocialMedia], { name: "socialMedias" })
  findAll() {
    return this.socialMediasService.findAll();
  }

  @Query(() => SocialMedia, { name: "socialMedia" })
  findOne(@Args("id", { type: () => String }) id: string) {
    return this.socialMediasService.findOneById(id);
  }

  @Mutation(() => SocialMedia)
  updateSocialMedia(
    @Args("id", { type: () => String })
    id: string,
    @Args("updateSocialMediaInput")
    updateSocialMediaInput: UpdateSocialMediaInput
  ) {
    return this.socialMediasService.update(id, updateSocialMediaInput);
  }

  @Mutation(() => SocialMedia)
  removeSocialMedia(@Args("id", { type: () => String }) id: string) {
    const toBeDeletedSocialMedia = this.socialMediasService.findOneById(id);

    if (!toBeDeletedSocialMedia) return null;
    return this.socialMediasService.remove(id);
  }
}
