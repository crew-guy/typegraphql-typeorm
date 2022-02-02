import { User } from './../../entity/User';
import { Arg, Mutation, Resolver } from "type-graphql";
import { v4 } from 'uuid';
import { redis } from 'redisdb';
import { forgotPasswordPrefix } from '../constants/userPrefixes';
import sendEmail from '../utils/sendEmail';

@Resolver()
export class ForgotPasswordResolver{
    @Mutation(() => Boolean)
    async forgotPassword(
        @Arg("email") email:string
    ) {
        const user = await User.findOne({ where: { email } })

        if (!user) {
            return true;
        }
        const token = v4()
        redis.set(forgotPasswordPrefix + token, user!.id, "ex", 60 * 24)
        const urlPre = process.env.NODE_ENV === "development" ? process.env.DEV_FRONTEND_URL : process.env.PROD_FRONTEND_URL 
        const forgotPasswordUrl = `${urlPre}user/change-password/${token}`

        sendEmail(email, forgotPasswordUrl)
        return true;
    }
}