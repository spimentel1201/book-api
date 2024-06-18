/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Field, ObjectType } from "@nestjs/graphql";
import { Author } from "src/authors/entities/author.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class Book {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field()
    @Column()
    title: string;

    @Field()
    @Column()
    description: string;

    @Field(type => Author)
    @ManyToOne(type => Author, author => author.books)
    author: Author;
}