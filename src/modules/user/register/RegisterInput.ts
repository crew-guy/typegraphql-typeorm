import { IsEmail, Length } from "class-validator";
import { PasswordInput } from "../../utils/PasswordInput";
import { Field, InputType } from "type-graphql";
import { IsEmailAlreadyExist } from "./isEmailAlreadyExist";

@InputType()
export class RegisterInput extends PasswordInput{
    @Field()
    @Length(1,255)
    firstName: string;
    
    @Field()
    @Length(1,255)
    lastName: string;

    @Field()
    @IsEmail()
    @IsEmailAlreadyExist({message:"Email already exists"})
    email: string;
}