/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Repository } from 'typeorm';
import { Author } from 'src/authors/entities/author.entity';
import { CreateBookDto } from './dtos/create-book.dto';
import { UpdateBookDto } from './dtos/update-book.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

/**
 * Service responsible for handling book operations.
 */
@Injectable()
export class BooksService {
    constructor(
        @InjectRepository(Book)
        private booksRepository: Repository<Book>,
        @InjectRepository(Author)
        private authorsRepository: Repository<Author>,
    ) {}
    
    /**
     * Retrieves a list of books with pagination.
     * 
     * @param paginationDto - DTO containing pagination parameters.
     */
    async findAll(paginationDto: PaginationDto): Promise<Book[]> {
        const { limit, offset } = paginationDto;
        return this.booksRepository.find({
          relations: ['author'],
          skip: offset,
          take: limit,
        });
      }
    
    /**
     * Retrieves a single book by ID.
     * 
     * @param id - Unique identifier of the book.
     */
    async findOne(id: string): Promise<Book> {
        return this.booksRepository.findOneBy({id});
    }

    /**
     * Creates a new book based on the provided createBookDto.
     * 
     * @param createBookDto - DTO containing book information.
     */

    async create(createBookDto: CreateBookDto): Promise<Book> {
        const author = await this.authorsRepository.findOneBy({id: createBookDto.authorId});
        if (!author) {
            throw new NotFoundException(`Author with ID ${createBookDto.authorId} not found`);
        }
        const book = this.booksRepository.create({ ...createBookDto, author });
        return this.booksRepository.save(book);
    }
    
    /**
     * Updates an existing book based on the provided updateBookDto.
     * 
     * @param updateBookDto - DTO containing updated book information.
     */
    async update(updateBookDto: UpdateBookDto): Promise<Book> {
        const book = await this.booksRepository.preload(updateBookDto);
        if (!book) {
            throw new NotFoundException(`Book with ID ${updateBookDto.id} not found`);
        }
        return this.booksRepository.save(book);
    }
    
    /**
     * Removes a book by ID.
     * 
     * @param id - Unique identifier of the book to be removed.
     */
    async remove(id: string): Promise<Book> {
        const book = await this.booksRepository.findOneBy({id});
        if (!book) {
            throw new NotFoundException(`Book with ID ${id} not found`);
        }
        return this.booksRepository.remove(book);
      }
}
