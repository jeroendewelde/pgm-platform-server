import { registerEnumType } from "@nestjs/graphql";

export enum AttachmentType {
  SCREENSHOT = 'SCREENSHOT',
  MOODBOARD = 'MOODBOARD',
  IDEABOARD = 'IDEABOARD',
  SCREENCAST = 'SCREENCAST',
  CODESNIPPET = 'CODESNIPPET',
  ACADEMICPOSTER = 'ACADEMICPOSTER',
  MOCKUP = 'MOCKUP',

  
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO',
  AUDIO = 'AUDIO',
  // DOCUMENT = 'DOCUMENT',

  OTHER = 'OTHER',
}

registerEnumType(AttachmentType, {
  name: 'AttachmentType',
  description: 'The type of the attachment' 
});