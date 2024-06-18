/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Author } from './entities/author.entity';
import { AuthorsService } from './authors.service';
import { CreateAuthorDto } from './dtos/create-auhor.dto';
import { ParseUUIDPipe } from '@nestjs/common';
import { UpdateAuthorDto } from './dtos/update-author.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

/**
 * Resolver class responsible for handling GraphQL queries and mutations related to authors.
 * This class acts as an interface between the GraphQL schema and the AuthorsService.
 */
@Resolver()
export class AuthorsResolver {
    constructor(private authorsService: AuthorsService) {}
    /**
     * Get a list of authors with pagination.
     * This query is used to fetch a list of authors with optional pagination parameters.
     * 
     * @param paginationDto - Data transfer object containing pagination parameters.
     * @returns Array of Author objects.
     */
    @Query(returns => [Author])
    authors(@Args('paginationDto', { type: () => PaginationDto, nullable: true }) paginationDto: PaginationDto) {
      return this.authorsService.findAll(paginationDto || { offset: 0, limit: 10 });
    }

    /**
     * Creates a new author based on the provided createAuthorDto.
     * This mutation is used to create a new author with the provided information.
     * 
     * @param createAuthorDto - Data transfer object containing author information.
     * @returns Newly created Author object.
     */
    @Mutation(returns => Author)
    createAuthor(@Args('createAuthorDto') createAuthorDto: CreateAuthorDto) {
        return this.authorsService.create(createAuthorDto);
    }

    /**
     * Updates an existing author based on the provided updateAuthorDto.
     * This mutation is used to update an existing author with the provided information.
     * 
     * @param updateAuthorDto - Data transfer object containing updated author information.
     * @returns Updated Author object.
     */
    @Mutation(returns => Author)
    updateAuthor(@Args('updateAuthorDto', ParseUUIDPipe) updateAuthorDto: UpdateAuthorDto) {
        return this.authorsService.update(updateAuthorDto);
    }

    /**
     * Removes an author by ID.
     * This mutation is used to delete an author with the provided ID.
     * 
     * @param id - Unique identifier of the author to be removed.
     * @returns Removed Author object.
     */
    @Mutation(returns => Author)
    removeAuthor(@Args('id', { type: () => String }, ParseUUIDPipe) id: string) {
        return this.authorsService.remove(id);
    }
}
