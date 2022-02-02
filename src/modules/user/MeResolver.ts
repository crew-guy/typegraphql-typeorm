import { User } from "../../entity/User";
import { MyContext } from "src/types/MyContext";
import { Ctx, Query, Resolver } from "type-graphql";

@Resolver() 
export class MeResolver{
    @Query(() => User, { nullable: true })
    async me(@Ctx() ctx: MyContext):Promise<User|undefined> {
        const session =ctx.req.session! as any 
        if (!session.userId) {
            return undefined;
        }
        return await User.findOne(session.userId);
    }
}