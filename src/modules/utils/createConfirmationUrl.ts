import { redis } from "../../../redisdb"
import { v4 } from "uuid"
import { confirmUserPrefix } from "../constants/userPrefixes"

export const createConfirmationUrl = (userId:string) => {
    const token = v4()
    redis.set(confirmUserPrefix + token, userId, "ex", 60 * 60 * 24)
    const urlPre = process.env.NODE_ENV === "development" ? process.env.DEV_FRONTEND_URL : process.env.PROD_FRONTEND_URL 
    return `${urlPre}/user/confirm/${token}`
}