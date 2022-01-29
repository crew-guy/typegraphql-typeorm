// src/entity/Address.ts

import { Field, ID, ObjectType, registerEnumType } from "type-graphql";
import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

export enum AssociatedEntity{
    Consignor = "Consignor",
    Consignee = "Consignee",
    Depot = "Depot",
    Operator = "Operator",
    Driver = "Driver"
}

registerEnumType(AssociatedEntity, {
    name: "AssociatedEntity", // this one is mandatory
    description: "The entity associated with the transport activity", // this one is optional
});
  
@Entity("courses")
@ObjectType()
export class Course extends BaseEntity{
    @Field(()=>String)
    @PrimaryColumn()
    course_uuid:string
        
    @Field(() => String)
    @Column({unique:true})
    institute_id: string;
        
    @Field(() => String)
    @Column({unique:true})
    course_number: string;

    @Field(() => String)
    @Column()
    course_name: string;

    @Field(() => String)
    @Column()
    instructor_name: string;

    @Field(() => String)
    @Column()
    online_link: string;
    
    @Field(() => Number)
    @Column()
    credits: number;

    @Field(() => [Course])
    @OneToMany(type => Course, course => course.prerequisites)
    prerequisites: Course[]

    @Field(() => [Course])
    @OneToMany(type => Course, course => course.dependencies)
    dependencies: Course[]
}