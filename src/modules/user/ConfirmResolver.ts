import { redis } from "../../../redisdb";
import { MyContext } from "src/types/MyContext";
import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { User } from "../../entity/User";

@Resolver()
export class ConfirmResolver{
    @Mutation(() => Boolean)
    async confirmUserRegistration(
        @Arg("token") token: string,
        @Ctx() ctx: MyContext
    ) {
        const userId = await redis.get(token);
        if (!userId) {
            return false;
        }

        await User.update({ id: parseInt(userId, 10) }, { confirmed: true });
        return true;
    }
} 