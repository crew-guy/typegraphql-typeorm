// src/entity/Course.ts

import { Field, ID, ObjectType, registerEnumType } from "type-graphql";
import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

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

    // TODO: Following fields need to be modified & updated to actual values later on

    // @Field(() => Number)
    // @Column()
    // numAvailSeats:number;

    // @Field(() => Number)
    // @Column()
    // numReservedSeats:number;

    // @Field(() => [String])
    // @Column()
    // comments:string[];

    // @Field(() => String)
    // @Column()
    // slot:string;
}