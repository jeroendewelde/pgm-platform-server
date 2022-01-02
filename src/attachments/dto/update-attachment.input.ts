import { CreateAttachmentInput } from './create-attachment.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { AttachmentType } from 'src/scalars/attachment-type.scalar';

@InputType()
export class UpdateAttachmentInput extends PartialType(CreateAttachmentInput) {
  @Field(() => String, { description: 'The name of the attachment' })
  name: string

  @Field(() => String, { description: 'The url of the attachment' })
  url: string

  @Field(() => String, { description: 'The type of the attachment' })
  type: AttachmentType
}
