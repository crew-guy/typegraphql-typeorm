import { Resolver, Query, Mutation, Arg, Authorized, UseMiddleware } from "type-graphql";
import bcrypt from "bcryptjs";

import { User } from "../../entity/User";
import { RegisterInput } from "./register/RegisterInput";
import { logger } from "../middleware/logger";
import { isAuth } from "../middleware/isAuth";
import { createConfirmationUrl } from "../utils/createConfirmationUrl";
import sendEmail from "../utils/sendEmail";

@Resolver()
export class RegisterResolver {
  // @Authorized()
  @UseMiddleware(logger, isAuth)
  @Query(() => String)
  async hello() {
    return "Hello World!";
  }

  @Mutation(() => User)
  async register(@Arg("data")
  {
    email,
    firstName,
    lastName,
    password
  }: RegisterInput): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword
    }).save();

    const confirmUrl = await  createConfirmationUrl((user.id).toString())
    await sendEmail(email,confirmUrl)
    return user;
  }
}
