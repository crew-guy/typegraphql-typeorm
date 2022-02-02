import { redis } from "../../../redisdb";
import { MyContext } from "src/types/MyContext";
import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { User } from "../../entity/User";
import { confirmUserPrefix } from "../constants/userPrefixes";

@Resolver()
export class ConfirmResolver{
    @Mutation(() => Boolean)
    async confirmUserRegistration(
        @Arg("token") token: string,
        @Ctx() ctx: MyContext
    ):Promise<boolean> {
        const userId = await redis.get(confirmUserPrefix + token);
        if (!userId) {
            return false;
        }

        await User.update({ id: parseInt(userId, 10) }, { confirmed: true });
        return true;
    }
} 