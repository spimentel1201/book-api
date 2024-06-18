/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Author } from './entities/author.entity';
import { AuthorsService } from './authors.service';
import { CreateAuthorDto } from './dtos/create-auhor.dto';
import { Param, ParseUUIDPipe } from '@nestjs/common';
import { UpdateAuthorDto } from './dtos/update-author.dto';

@Resolver()
export class AuthorsResolver {
    constructor(private authorsService: AuthorsService) {}

    @Query(returns => [Author])
    authors() {
        return this.authorsService.findAll();
    }


    @Mutation(returns => Author)
    createAuthor(@Args('createAuthorDto') createAuthorDto: CreateAuthorDto) {
        return this.authorsService.create(createAuthorDto);
    }

    @Mutation(returns => Author)
    updateAuthor(@Args('updateAuthorDto', ParseUUIDPipe) updateAuthorDto: UpdateAuthorDto) {
        return this.authorsService.update(updateAuthorDto);
    }

    @Mutation(returns => Author)
    removeAuthor(@Args('id', { type: () => String }, ParseUUIDPipe) id: string) {
        return this.authorsService.remove(id);
    }
}
