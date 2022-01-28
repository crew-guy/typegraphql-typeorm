// src/resolvers/CourseResolver.ts

import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { Course } from "../entity/Course";
// import { CreateCourseInput } from "../inputs/CourseInput/CreateCourseInput";
// import { UpdateCourseInput } from "../inputs/CourseInput/UpdateCourseInput";

@Resolver()
export class CourseResolver {
  @Query(() => [Course])
    allCourses() {
      return Course.find()
    }
//   @Mutation(() => Course)
//   async createCourse(@Arg("data") data: CreateCourseInput) {
//     const Course = Course.create(data);
//     await Course.save();
//     return Course;
//   }
//   @Query(() => Course)
//     Course(@Arg("unique_Addres_id") unique_Addres_id: string) {
//       return Course.findOne({ where: { unique_Addres_id } });
//   }
//   @Mutation(() => Course)
//   async updateCourse(@Arg("unique_Addres_id") unique_Course_id: string, @Arg("data") data: UpdateCourseInput) {
//     const Course = await Course.findOne({ where: { unique_Course_id } });
//     if (!Course) throw new Error("Course not found!");
//     Object.assign(Course, data);
//     await Course.save();
//     return Course;
//   }
//   @Mutation(() => Course)
//   async deleteCourse(@Arg("unique_Addres_id") unique_Course_id: string) {
//     const Course = await Course.findOne({ where: { unique_Course_id } });
//     if (!Course) throw new Error("Course not found!");
//     await Course.remove();
//     // Fetch removed Course
//     return Course;
//   }
}