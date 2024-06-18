/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Book } from './entities/book.entity';
import { BooksService } from './books.service';
import { CreateBookDto } from './dtos/create-book.dto';
import { UpdateBookDto } from './dtos/update-book.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

/**
 * Resolver class responsible for handling GraphQL queries and mutations related to books.
 */
@Resolver((of: any) => Book)
export class BooksResolver {
    constructor(private booksService: BooksService) {}

    /**
     * Retrieves a list of books with pagination.
     * 
     * @param paginationDto - Data transfer object containing pagination parameters.
     * @returns Array of Book objects.
     */
    @Query(returns => [Book])
    books(@Args('paginationDto', { type: () => PaginationDto, nullable: true }) paginationDto: PaginationDto) {
      return this.booksService.findAll(paginationDto || { offset: 0, limit: 10 });
    }
    
    /**
     * Creates a new book based on the provided createBookDto.
     * This mutation is used to create a new book with the provided information.
     * 
     * @param createBookDto - Data transfer object containing book information.
     * @returns Newly created Book object.
     */
    @Mutation(returns => Book)
    createBook(@Args('createBookDto') createBookDto: CreateBookDto) {
        return this.booksService.create(createBookDto);
    }

    /**
     * Updates an existing book based on the provided updateBookDto.
     * This mutation is used to update an existing book with the provided information.
     * 
     * @param updateBookDto - Data transfer object containing updated book information.
     * @returns Updated Book object.
     */
    @Mutation(returns => Book)
    updateBook(@Args('updateBookDto') updateBookDto: UpdateBookDto) {
        return this.booksService.update(updateBookDto);
    }

    /**
     * Removes a book by ID.
     * This mutation is used to delete a book with the provided ID.
     * 
     * @param id - Unique identifier of the book to be removed.
     * @returns Removed Book object.
     */
    @Mutation(returns => Book)
    removeBook(@Args('id') id: string) {
        return this.booksService.remove(id);
    }
}
