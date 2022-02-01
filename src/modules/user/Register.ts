import { Arg, FieldResolver, Mutation, Query, Resolver, Root } from "type-graphql";
import * as bcrypt from 'bcryptjs'
import { RegisterInput } from "./register/RegisterInput";
import { User } from "src/entity/User";

@Resolver(User)
export class RegisterResolver{
    @Query(() => String)
    async hello() {
        return "Hello World!";
    }

    // @FieldResolver()
    // async name(@Root() parent: User) {
    //     return `${parent.firstName} ${parent.lastName}`
    // }

    @Mutation(() => String)
    async registerUser(
        @Arg("data") {firstName, lastName, email, password}:RegisterInput
    ): Promise<User> {
        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
        }).save()      

        return user
    }
}