import { MinLength } from 'class-validator';
import { ClassType, Field, InputType } from 'type-graphql';
export const PasswordMixin = <T extends ClassType>(BaseClass:T) => {
    @InputType()
    class PasswordInputAlt extends BaseClass{
        @Field()
        @MinLength(5, { message: "Password must be atleast 5 characters" })
        password:string
    }
    return PasswordInputAlt
}