import { Injectable } from '@nestjs/common';
import { CreateLearlingLineInput } from './dto/create-learling-line.input';
import { UpdateLearlingLineInput } from './dto/update-learling-line.input';

@Injectable()
export class LearlingLinesService {
  create(createLearlingLineInput: CreateLearlingLineInput) {
    return 'This action adds a new learlingLine';
  }

  findAll() {
    return `This action returns all learlingLines`;
  }

  findOne(id: number) {
    return `This action returns a #${id} learlingLine`;
  }

  update(id: number, updateLearlingLineInput: UpdateLearlingLineInput) {
    return `This action updates a #${id} learlingLine`;
  }

  remove(id: number) {
    return `This action removes a #${id} learlingLine`;
  }
}
