import { PasswordInput } from "../../utils/PasswordInput";
import { Field, InputType } from "type-graphql";
import { PasswordMixin } from "../../shared/PasswordMixin";

@InputType()
// Using a mixin to extend multiple classes in a sort of inheritance - https://youtu.be/j9dOdjBzARo?t=581
export class UpdatePasswordInput extends PasswordMixin(class {}) { 
    @Field()
    token:string
}