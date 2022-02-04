import { PasswordInput } from "../../utils/PasswordInput";
import { Field, InputType } from "type-graphql";

@InputType()
export class UpdatePasswordInput extends PasswordInput { 
    @Field()
    token:string
}