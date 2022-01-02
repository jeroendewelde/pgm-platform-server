import { Module } from '@nestjs/common';
import { AttachmentsService } from './attachments.service';
import { AttachmentsResolver } from './attachments.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attachment } from './entities/attachment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Attachment]),
  ],
  providers: [AttachmentsResolver, AttachmentsService],
  exports: [
    AttachmentsService,
  ]
})
export class AttachmentsModule {}
