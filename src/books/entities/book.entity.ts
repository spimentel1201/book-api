/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Field, ObjectType } from "@nestjs/graphql";
import { Author } from "src/authors/entities/author.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class Book {
    @Field({ description: 'The identifier of the book' })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field({ description: 'The title of the book' })
    @Column('text', {
        nullable: false,
    })
    title: string;

    @Field({ description: 'The description of the book' })
    @Column('text', {
        nullable: false,
    })
    description: string;

    @Field(type => Author, { description: 'The author of a book' })
    @ManyToOne(type => Author, author => author.books)
    author: Author;
}