import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLearningLineInput } from './dto/create-learning-line.input';
import { UpdateLearningLineInput } from './dto/update-learning-line.input';
import { LearningLine } from './entities/learning-line.entity';

@Injectable()
export class LearningLinesService {
  constructor(
    @InjectRepository(LearningLine)
    private readonly learningLineRepository: Repository<LearningLine>,
  ) {}

  create(createLearningLineInput: CreateLearningLineInput): Promise<LearningLine> {
    const newLearningLine = this.learningLineRepository.create(createLearningLineInput);
    return this.learningLineRepository.save(newLearningLine);
  }

  findAll(): Promise<LearningLine[]> {
    return this.learningLineRepository.find();
  }

  findOneById(id: number): Promise<LearningLine> {
    return this.learningLineRepository.findOne(id);
  }

  update(id: number, updateLearningLineInput: UpdateLearningLineInput): Promise<LearningLine> {
    return this.learningLineRepository.save({
      id: id,
      ...updateLearningLineInput,
    });
  }

  async remove(id: number): Promise<LearningLine> {
    const learningLine = await this.learningLineRepository.findOneOrFail(id);
    return await this.learningLineRepository.remove(learningLine);
  }
}
