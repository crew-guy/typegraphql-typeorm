import { User } from './../../entity/User';
import { forgotPasswordPrefix } from './../constants/userPrefixes';
import { redis } from 'redisdb';
import { Arg, Mutation } from 'type-graphql';
import { Resolver } from 'type-graphql';
@Resolver()
export class ChangePasswordResolver{
    @Mutation(() => Boolean)
    async changePassword(
        @Arg("token") token: string,
        @Arg("newPassword") newPassword: string
    ) {
        const userId = await redis.get(forgotPasswordPrefix + token)
        if (!userId) {
            return false;
        }
        await User.update({id:parseInt(userId,10)},{password:newPassword})
        return true;
    }
}