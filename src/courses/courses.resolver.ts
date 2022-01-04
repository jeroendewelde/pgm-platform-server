import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';

import { Course } from './entities/course.entity';
import { CreateCourseInput } from './dto/create-course.input';
import { UpdateCourseInput } from './dto/update-course.input';
import { CoursesService } from './courses.service';
import { Project } from 'src/projects/entities/project.entity';
import { Person } from 'src/persons/entities/person.entity';
import { Attachment } from 'src/attachments/entities/attachment.entity';
import { LearningLine } from 'src/learning-lines/entities/learning-line.entity';

@Resolver(() => Course)
export class CoursesResolver {
  constructor(private readonly coursesService: CoursesService) {}

  @Mutation(() => Course)
  createCourse(@Args('createCourseInput') createCourseInput: CreateCourseInput): Promise<Course> {
    return this.coursesService.create(createCourseInput);
  }

  @Mutation(() => Course)
  addAttachmentsToCourse(
    @Args('courseId', { type: () => Int }) 
    courseId: number,
    @Args('attachments', { type: () => [Int] }) 
    attachments: number[]
  ): Promise<Course> {
    return this.coursesService.addAttachmentsToCourse(courseId, attachments);
  }

  @Mutation(() => Course)
  addTeachersToCourse(
    @Args('courseId', { type: () => Int }) 
    courseId: number,
    @Args('teacherIds', { type: () => [Int] }) 
    teacherIds: number[]
  ): Promise<Course> {
    return this.coursesService.addTeachersToCourse(courseId, teacherIds);
  }

  @Query(() => [Course], { name: 'courses' })
  findAll(): Promise<Course[]> {
    return this.coursesService.findAll();
  }

  @Query(() => Course, { name: 'course' })
  findOne(@Args('id', { type: () => Int }) id: number): Promise<Course> {
    return this.coursesService.findOneById(id);
  }

  @ResolveField(() => [Attachment])
  attachments(
    @Parent() course: Course,
  ): Promise<Attachment[]> {
    return this.coursesService.getAttachments(course.id);
  }

  @ResolveField(() => LearningLine)
  learningLine(
    @Parent() 
    course: Course
  ): Promise<LearningLine> {
    return this.coursesService.getLearningLine(course.id);
  }

  @Query(() => [Course], { name: 'coursesByLearningLineId' })
  findAllByLearningLineId(@Args('learningLineId', { type: () => Int }) learningLineId: number): Promise<Course[]> {
    return this.coursesService.findByLearningLineId(learningLineId);
  }

  @ResolveField(returns => [Project])
  projects(@Parent() course: Course): Promise<Project[]> {
    return this.coursesService.getProjects(course.id);
  }

  @ResolveField(returns => [Person])
  teachers(@Parent() course: Course): Promise<Person[]> {
    return this.coursesService.getTeachers(course.id);
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
