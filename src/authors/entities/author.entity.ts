/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Field, ObjectType } from "@nestjs/graphql";
import { Book } from "src/books/entities/book.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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

    @Field(type => [Book])
    @OneToMany(type => Book, book => book.author)
    books: Book[];
}