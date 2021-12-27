import { CreateSocialMediaInput } from './create-social-media.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

import { SocialMediaPlatform } from 'src/scalars/social-media-platform.scalar';

@InputType()
export class UpdateSocialMediaInput extends PartialType(CreateSocialMediaInput) {
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
