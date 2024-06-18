/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Book } from './entities/book.entity';
import { BooksService } from './books.service';
import { CreateBookDto } from './dtos/create-book.dto';
import { UpdateBookDto } from './dtos/update-book.dto';
import { PaginationArgs } from 'src/common/dtos/pagination.dto';

@Resolver((of: any) => Book)
export class BooksResolver {
    constructor(private booksService: BooksService) {}

    @Query(returns => [Book])
    books(@Args('paginationArgs', { type: () => PaginationArgs, nullable: true }) paginationArgs: PaginationArgs) {
        return this.booksService.findAll(paginationArgs || { first: 10 });
      }
    @Mutation(returns => Book)
    createBook(@Args('createBookDto') createBookDto: CreateBookDto) {
        return this.booksService.create(createBookDto);
    }

    @Mutation(returns => Book)
    updateBook(@Args('updateBookDto') updateBookDto: UpdateBookDto) {
        return this.booksService.update(updateBookDto);
    }

    @Mutation(returns => Book)
    removeBook(@Args('id') id: string) {
        return this.booksService.remove(id);
    }
}
