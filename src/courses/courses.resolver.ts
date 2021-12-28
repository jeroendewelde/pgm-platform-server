import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';

import { Course } from './entities/course.entity';
import { CreateCourseInput } from './dto/create-course.input';
import { UpdateCourseInput } from './dto/update-course.input';
import { CoursesService } from './courses.service';

@Resolver(() => Course)
export class CoursesResolver {
  constructor(private readonly coursesService: CoursesService) {}

  @Mutation(() => Course)
  createCourse(@Args('createCourseInput') createCourseInput: CreateCourseInput): Promise<Course> {
    return this.coursesService.create(createCourseInput);
  }

  @Query(() => [Course], { name: 'courses' })
  findAll(): Promise<Course[]> {
    return this.coursesService.findAll();
  }

  @Query(() => Course, { name: 'course' })
  findOne(@Args('id', { type: () => Int }) id: number): Promise<Course> {
    return this.coursesService.findOneById(id);
  }

  @Mutation(() => Course)
  updateCourse(
    @Args('id', { type: () => Int }) 
    id: number,
    @Args('updateCourseInput') 
    updateCourseInput: UpdateCourseInput
  ): Promise<Course> {
    return this.coursesService.update(id, updateCourseInput);
  }

  @Mutation(() => Course)
  removeCourse(@Args('id', { type: () => Int }) id: number): Promise<Course> {
    const toBeDeletedCourse = this.coursesService.findOneById(id);

    if(!toBeDeletedCourse) return null
    return this.coursesService.remove(id)
  }
}
