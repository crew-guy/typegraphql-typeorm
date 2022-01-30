import { ObjectType } from "type-graphql";
import { BaseEntity, Entity } from "typeorm";

@Entity("users")
@ObjectType()
class User extends BaseEntity{

}