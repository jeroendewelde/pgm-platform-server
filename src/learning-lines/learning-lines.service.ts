import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateLearningLineInput } from "./dto/create-learning-line.input";
import { UpdateLearningLineInput } from "./dto/update-learning-line.input";
import { LearningLine } from "./entities/learning-line.entity";

@Injectable()
export class LearningLinesService {
  constructor(
    @InjectRepository(LearningLine)
    private readonly learningLineRepository: Repository<LearningLine>
  ) {}

  create(
    createLearningLineInput: CreateLearningLineInput
  ): Promise<LearningLine> {
    const newLearningLine = this.learningLineRepository.create(
      createLearningLineInput
    );
    return this.learningLineRepository.save(newLearningLine);
  }

  async findAll(): Promise<LearningLine[]> {
    // async findAll(): Promise<Object(LearningLine[], number)> {

    // async findAll(): Promise<[LearningLine[], number]> {
    // async findAll(): Promise<[LearningLine[], number]> {

    // return this.learningLineRepository.find();
    const [result, total] = await this.learningLineRepository.findAndCount();
    console.log("result...", result);
    console.log("total...", total);

    return result;
    // return {
    //   data: result,
    //   count: total
    // }
    // return [ result, total ];
  }

  findOneById(id: number): Promise<LearningLine> {
    return this.learningLineRepository.findOne(id);
  }

  update(
    id: number,
    updateLearningLineInput: UpdateLearningLineInput
  ): Promise<LearningLine> {
    return this.learningLineRepository.save({
      id: id,
      ...updateLearningLineInput,
    });
  }

  async remove(id: number): Promise<LearningLine> {
    const toBeDeletedLearningLine =
      await this.learningLineRepository.findOneOrFail(id);
    // console.log("service, toBeDeletedLearningLine...", toBeDeletedLearningLine);
    return this.learningLineRepository.remove(toBeDeletedLearningLine);

    // console.log(
    //   "service, toBeDeletedLearningLineAGAIN...",
    //   toBeDeletedLearningLine
    // );

    // return toBeDeletedLearningLine;
    // return await toBeDeletedLearningLine;
    // return toBeDeletedLearningLine;
  }
}
