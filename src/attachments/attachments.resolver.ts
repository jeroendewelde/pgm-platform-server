import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AttachmentsService } from './attachments.service';
import { Attachment } from './entities/attachment.entity';
import { CreateAttachmentInput } from './dto/create-attachment.input';
import { UpdateAttachmentInput } from './dto/update-attachment.input';

@Resolver(() => Attachment)
export class AttachmentsResolver {
  constructor(private readonly attachmentsService: AttachmentsService) {}

  @Mutation(() => Attachment)
  createAttachment(@Args('createAttachmentInput') createAttachmentInput: CreateAttachmentInput): Promise<Attachment> {
    return this.attachmentsService.create(createAttachmentInput);
  }

  @Query(() => [Attachment], { name: 'attachments' })
  findAll(): Promise<Attachment[]> {
    return this.attachmentsService.findAll();
  }

  @Query(() => Attachment, { name: 'attachment' })
  findOne(@Args('id', { type: () => Int }) id: number): Promise<Attachment> {
    return this.attachmentsService.findOneById(id);
  }

  @Mutation(() => Attachment)
  updateAttachment(
    @Args('id', { type: () => Int }) 
    id: number,
    @Args('updateAttachmentInput') 
    updateAttachmentInput: UpdateAttachmentInput
  ): Promise<Attachment> {
    return this.attachmentsService.update(id, updateAttachmentInput);
  }

  @Mutation(() => Attachment)
  removeAttachment(@Args('id', { type: () => Int }) id: number): Promise<Attachment> {
    const toBeDeletedAttachment = this.attachmentsService.findOneById(id);

    if(!toBeDeletedAttachment) return null
    return this.attachmentsService.remove(id);
  }
}
