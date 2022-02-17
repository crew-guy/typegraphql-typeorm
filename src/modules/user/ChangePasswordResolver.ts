import bcrypt  from 'bcryptjs';
import { User } from './../../entity/User';
import { forgotPasswordPrefix } from './../constants/userPrefixes';
import { redis } from '../../../redisdb';
import { Arg, Ctx, Mutation } from 'type-graphql';
import { Resolver } from 'type-graphql';
import { UpdatePasswordInput } from './register/UpdatePasswordInput';
import { MyContext } from 'src/types/MyContext';

@Resolver()
export class ChangePasswordResolver {
    @Mutation(() => User, { nullable: true })
    async changePassword(
        @Arg("data") {token, password}: UpdatePasswordInput,
        @Ctx() ctx: MyContext
    ):Promise<User|null> {
        const userId = await redis.get(forgotPasswordPrefix + token)
        if (!userId) {
            return null;
        }
        const user = await User.findOne(userId)
        if (!user) {
            return null;
        }
        user.password = await bcrypt.hash(password, 12)

        await user.save();
        (ctx.req.session as any)!.userId = user.id;
        await redis.del(token);
        return user;
    }
}