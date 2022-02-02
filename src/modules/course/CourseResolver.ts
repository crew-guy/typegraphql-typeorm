import { CreateCourseInput } from '../../inputs/CreateCourseInput';
// src/resolvers/CourseResolver.ts

import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { Course } from "../../entity/Course";
// import { CreateCourseInput } from "../inputs/CourseInput/CreateCourseInput";
// import { UpdateCourseInput } from "../inputs/CourseInput/UpdateCourseInput";

@Resolver()
export class CourseResolver {
  @Query(() => [Course])
    allCourses() {
      return Course.find()
  }

  @Query(() => [Course])
    async returnDependentCourses(@Arg("course_id") course_number:string) {
      const currentCourse = await Course.findOne({ course_number: course_number });
      if(!currentCourse) throw new Error("Course does not exist in our list!");
      const deps = currentCourse.dependencies;
      return deps;
  }

  @Query(() => [Course])
    async returnPrerequisiteCourses(@Arg("course_id") course_number:string) {
      const currentCourse = await Course.findOne({ course_number: course_number });
      if(!currentCourse) throw new Error("Course does not exist in our list!");
      const deps = currentCourse.prerequisites;
      return deps;
  }
  
  @Mutation(() => Course)
  async addCourse(@Arg("course") courseInput: CreateCourseInput) {
    if (courseInput.prerequisiteCourseNumbers) {
      for(const prerequisite of courseInput.prerequisiteCourseNumbers) {
        const prereq = await Course.find({where: {course_number: prerequisite}});
        if(!prereq) throw new Error("Prerequisite course does not exist in our list!");
    }
    }
  }
  
}
