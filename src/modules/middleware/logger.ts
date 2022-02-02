import { MyContext } from 'src/types/MyContext';
import { MiddlewareFn } from "type-graphql";

export const logger: MiddlewareFn<MyContext> = async ({ context, args, info }, next) => {
    console.log("logger");
    return next();
}