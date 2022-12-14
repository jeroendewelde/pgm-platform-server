import { CreateSocialMediaInput } from "./create-social-media.input";
import { InputType, Field, Int, PartialType } from "@nestjs/graphql";
import { IsNotEmpty, IsString, IsUrl } from "class-validator";

import { SocialMediaPlatform } from "src/scalars/social-media-platform.scalar";

@InputType()
// export class UpdateSocialMediaInput extends PartialType(
//   CreateSocialMediaInput
// ) {
export class UpdateSocialMediaInput {
  @Field(() => String, {
    description: "The ID of this social media information",
    nullable: true,
  })
  id?: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => SocialMediaPlatform, {
    description: "The name of the social media platform",
    nullable: true,
  })
  platform?: SocialMediaPlatform;

  @IsNotEmpty()
  @IsUrl()
  @Field(() => String, {
    description: "The URL of the social media",
    nullable: true,
  })
  url?: string;

  @Field((type) => Int, { nullable: true })
  personId?: number;
}
