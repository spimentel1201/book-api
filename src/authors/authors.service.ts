/* eslint-disable prettier/prettier */
import { Author } from './entities/author.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAuthorDto } from './dtos/create-auhor.dto';
import { UpdateAuthorDto } from './dtos/update-author.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

/**
 * Service responsible for handling author operations.
 */
@Injectable()
export class AuthorsService {
    constructor(
        @InjectRepository(Author)
        private authorsRepository: Repository<Author>,
    ) {}
    
    /**
     * Creates a new author based on createAuthorDto info and return data.
     * 
     * @param createAuthorDto - DTO containing author information.
     */
    async create(createAuthorDto: CreateAuthorDto): Promise<Author> {
        const newAuthor = this.authorsRepository.create(createAuthorDto);
        return this.authorsRepository.save(newAuthor);
    }
    
    /**
     * Retrieves a list of authors with related books with pagination.
     * 
     * @param paginationDto - DTO containing pagination parameters.
     */
    async findAll(paginationDto: PaginationDto): Promise<Author[]> {
        const { limit, offset } = paginationDto;
        return this.authorsRepository.find({
          relations: ['books'],
          skip: offset,
          take: limit,
        });
      }

    /**
     * Retrieves one author by ID.
     * 
     * @param id - Unique identifier of the author.
     */
    async findOne(id: string): Promise<Author> {
        return this.authorsRepository.findOneBy({id});
    }

    /**
     * Updates an existing author based on the provided updateAuthorDto.
     * 
     * @param updateAuthorDto - DTO containing updated author information.
     */
    async update(updateAuthorDto: UpdateAuthorDto): Promise<Author> {
        const updatedAuthor = await this.authorsRepository.preload(updateAuthorDto);
        if(!updatedAuthor) throw new NotFoundException(`Author with ${updateAuthorDto.id} not found`);
        return this.authorsRepository.save(updatedAuthor)
    }

    /**
     * Removes an author by ID.
     * 
     * @param id - Unique identifier of the author to be removed.
     */
    async remove(id: string): Promise<any> {
        const author = await this.authorsRepository.findOneBy({id});
        if (!author) {
        throw new NotFoundException(`Author with ID ${id} not found`);
        }
        return this.authorsRepository.remove(author);
    }
}
