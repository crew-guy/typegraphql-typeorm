import bcrypt  from 'bcryptjs';
import { User } from './../../entity/User';
import { forgotPasswordPrefix } from './../constants/userPrefixes';
import { redis } from '../../../redisdb';
import { Arg, Ctx, Mutation } from 'type-graphql';
import { Resolver } from 'type-graphql';
import { MyContext } from 'src/types/MyContext';

@Resolver()
export class ChangePasswordResolver{
    @Mutation(() => User)
    async changePassword(
        @Arg("token") token: string,
        @Arg("newPassword") newPassword: string,
        @Ctx() ctx: MyContext
    ):Promise<User|null> {
        const userId = await redis.get(forgotPasswordPrefix + token)
        if (!userId) {
            return null;
        }
        const user = await User.findOne(10)
        if (!user) {
            return null;
        }
        user.password = await bcrypt.hash(newPassword, 12)

        await user.save();
        (ctx.req.session as any)!.userId = user.id;
        await redis.del(token);
        return user;
    }
}