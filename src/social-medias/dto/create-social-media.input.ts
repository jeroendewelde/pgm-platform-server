import { InputType, Int, Field } from "@nestjs/graphql";
import { IsNotEmpty, IsString, IsUrl } from "class-validator";

import { SocialMediaPlatform } from "src/scalars/social-media-platform.scalar";

@InputType()
export class CreateSocialMediaInput {
  // @IsNotEmpty()
  @IsString()
  @Field(() => SocialMediaPlatform, {
    description: "The name of the social media platform",
    nullable: true,
  })
  platform?: SocialMediaPlatform;

  // @IsNotEmpty()
  // @IsUrl()
  @Field(() => String, {
    description: "The URL of the social media",
    nullable: true,
  })
  url?: string;

  @Field((type) => Int)
  personId: number;
}
