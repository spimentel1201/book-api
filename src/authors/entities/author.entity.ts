/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Field, ObjectType } from "@nestjs/graphql";
import { Book } from "src/books/entities/book.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class Author {
    @Field({ description: 'Identifier of the author' })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field({ description: 'Author´s name' })
    @Column('text', {
        nullable: false,
    })
    name: string;
    
    @Field({ description: 'Author´s last name' })
    @Column('text', {
        nullable: false,
        name: 'last_name',
    })
    lastName: string;

    @Field(type => [Book],{ description: 'Relation of books from author' })
    @OneToMany(type => Book, book => book.author)
    books: Book[];
}