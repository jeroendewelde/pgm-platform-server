import { registerEnumType } from "@nestjs/graphql";

export enum SocialMediaPlatform {
  FACEBOOK = 'FACEBOOK',
  TWITTER = 'TWITTER',
  INSTAGRAM = 'INSTAGRAM',
  LINKEDIN = 'LINKEDIN',
  YOUTUBE = 'YOUTUBE',
  GITHUB = 'GITHUB',
  OTHER = 'OTHER',
}

registerEnumType(SocialMediaPlatform, {
  name: 'SocialMediaPlatform',
  description: 'The name of the social media platform',
});