import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGenerationInput } from './dto/create-generation.input';
import { UpdateGenerationInput } from './dto/update-generation.input';
import { Generation } from './entities/generation.entity';

@Injectable()
export class GenerationsService {
  constructor(
    @InjectRepository(Generation)
    private readonly generationRepository: Repository<Generation>,
  ) {}

  create(createGenerationInput: CreateGenerationInput): Promise<Generation> {
    const newGeneration = this.generationRepository.create(createGenerationInput);
    return this.generationRepository.save(newGeneration);
  }

  findAll(): Promise<Generation[]> {
    return this.generationRepository.find();
  }

  findOneById(id: number): Promise<Generation> {
    return this.generationRepository.findOneOrFail(id);
  }

  update(id: number, updateGenerationInput: UpdateGenerationInput): Promise<Generation> {
    return this.generationRepository.save({
      id: id,
      ...updateGenerationInput,
    });
  }

  async remove(id: number): Promise<Generation> {
    const generation = await this.findOneById(id);
    return this.generationRepository.remove(generation);
  }
}
