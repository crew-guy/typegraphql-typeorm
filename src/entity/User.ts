import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
@ObjectType()
export class User extends BaseEntity{
    @Field(()=>ID)
    @PrimaryGeneratedColumn()
    id: string
    
    @Field()
    @Column("varchar", { length: 255 })
    firstName:string
    
    @Field()
    @Column("varchar", { length: 255 })
    lastName:string
    
    @Field()
    @Column("varchar", { length: 255, unique:true })
    email: string
    
    @Field()
    name:string
    
    @Column()
    password:string
}