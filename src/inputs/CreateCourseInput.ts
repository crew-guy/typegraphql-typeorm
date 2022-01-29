import { Field, InputType } from "type-graphql";
import { Course } from "../entity/Course";

@InputType()
export class CreateCourseInput {
    @Field(() => String)
    course_number: string;

    @Field(() => String)
    course_name: string;

    @Field(() => String)
    institute_id: string;

    @Field(() => String)
    instructor_name: string;

    @Field(() => String)
    online_link: string;

    @Field(() => Number)
    credits: number;

    @Field(() => [String],{nullable:true})
    prerequisiteCourseNumbers?: String[];
}