import { InputType, Int, Field } from '@nestjs/graphql';
import { AttachmentType } from 'src/scalars/attachment-type.scalar';

@InputType()
export class CreateAttachmentInput {
  @Field(() => String, { description: 'The name of the attachment' })
  name: string

  @Field(() => String, { description: 'The url of the attachment' })
  url: string

  @Field(() => String, { description: 'The type of the attachment' })
  type: AttachmentType
}
