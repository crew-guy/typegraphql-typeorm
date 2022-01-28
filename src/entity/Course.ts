// src/entity/Address.ts

import { Field, ID, ObjectType, registerEnumType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    unique_course_id: number;
}