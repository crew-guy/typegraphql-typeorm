import { MinLength } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class PasswordInput{
    @Field()
    @MinLength(5, {
        message:"Password must be at least 5 characters"
    })
    password:string
}