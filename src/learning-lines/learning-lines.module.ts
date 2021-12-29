import { Module } from '@nestjs/common';
import { LearningLinesService } from './learning-lines.service';
import { LearningLinesResolver } from './learning-lines.resolver';
import { LearningLine } from './entities/learning-line.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([LearningLine]),
  ],
  providers: [LearningLinesResolver, LearningLinesService]
})
export class LearningLinesModule {}
