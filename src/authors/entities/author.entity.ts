/* eslint-disable prettier/prettier */
import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class Author {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field()
    @Column('text', {
        nullable: false,
    })
    name: string;
    
    @Field()
    @Column('text', {
        nullable: false,
        name: 'last_name',
    })
    lastName: string;
    
    @Field()
    @Column('boolean', {
        default: true,
        nullable: false,
        name: 'is_active',
    })
    isActive: boolean;
}