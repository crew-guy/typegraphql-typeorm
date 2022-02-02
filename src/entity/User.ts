// src/entity/User.ts

import { Field, ID, ObjectType, Root } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
@ObjectType()
export class User extends BaseEntity{
    @Field(()=>ID)
    @PrimaryGeneratedColumn()
    id: number
    
    @Field()
    @Column("varchar", { length: 255 })
    firstName:string
    
    @Field()
    @Column("varchar", { length: 255 })
    lastName:string
    
    @Field()
    @Column("varchar", { length: 255 })
    email: string
    
    //* Example code when we were using @FieldResolver
    // @Field()
    // name:string

    @Field()
    name(@Root() parent:User): string{
        return `${parent.firstName} ${parent.lastName}`
    }
    
    @Column()
    password: string
    
    @Column("bool", { default: true })
    confirmed: boolean
}