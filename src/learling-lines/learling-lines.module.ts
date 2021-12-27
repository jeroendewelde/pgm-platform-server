import { Module } from '@nestjs/common';
import { LearlingLinesService } from './learling-lines.service';
import { LearlingLinesResolver } from './learling-lines.resolver';

@Module({
  providers: [LearlingLinesResolver, LearlingLinesService]
})
export class LearlingLinesModule {}
