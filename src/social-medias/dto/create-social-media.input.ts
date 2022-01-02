import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

import { SocialMediaPlatform } from 'src/scalars/social-media-platform.scalar';

@InputType()
export class CreateSocialMediaInput {
  @IsNotEmpty()
  @IsString()
  @Field(() => String, { description: 'The name of the social media platform' })
  platform: SocialMediaPlatform

  @IsNotEmpty()
  @IsUrl()
  @Field(() => String, { description: 'The URL of the social media' })
  url: string

  @Field(type => Int)
  personId: number;
}
