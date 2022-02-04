import { MyContext } from "../../../types/MyContext";
import { Ctx, Mutation, Resolver } from "type-graphql";

@Resolver()
export class LogoutResolver{
    @Mutation(() => Boolean)
    async logout(
        @Ctx() ctx: MyContext
    ) {
        return new Promise((resolve, reject) => {
            ctx.req.session!.destroy(err => {
                if (err) {
                    return reject(false)
                }
            })

            ctx.res.clearCookie('qid');
            return resolve(true)
        })
        
    }
}