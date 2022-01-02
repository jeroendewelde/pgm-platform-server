import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SocialMedia } from './entities/social-media.entity';
import { SocialMediasResolver } from './social-medias.resolver';
import { SocialMediasService } from './social-medias.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([SocialMedia]),
  ],
  providers: [SocialMediasResolver, SocialMediasService],
  exports: [
    SocialMediasService,
  ]
})
export class SocialMediasModule {}
