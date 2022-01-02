import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAttachmentInput } from './dto/create-attachment.input';
import { UpdateAttachmentInput } from './dto/update-attachment.input';
import { Attachment } from './entities/attachment.entity';

@Injectable()
export class AttachmentsService {
  constructor(
    @InjectRepository(Attachment)
    private readonly attachmentRepository: Repository<Attachment>,
  ) {}

  create(createAttachmentInput: CreateAttachmentInput): Promise<Attachment> {
    const newAttachment = this.attachmentRepository.create(createAttachmentInput);
    return this.attachmentRepository.save(newAttachment);
  }

  async asyncfForEach(array, callback) {
    array.forEach(async(item) => {
      await callback(item);
    });
  }

  findAll(): Promise<Attachment[]> {
    return this.attachmentRepository.find();
  }

  findOneById(id: number): Promise<Attachment> {
    return this.attachmentRepository.findOneOrFail(id);
  }

  update(id: number, updateAttachmentInput: UpdateAttachmentInput): Promise<Attachment> {
    return this.attachmentRepository.save({
      id: id,
      ...updateAttachmentInput,
    })
  }

  async remove(id: number): Promise<Attachment> {
    const attachment = await this.findOneById(id);
    return this.attachmentRepository.remove(attachment);
  }
}
