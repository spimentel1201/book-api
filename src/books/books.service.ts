/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Repository } from 'typeorm';
import { Author } from 'src/authors/entities/author.entity';
import { CreateBookDto } from './dtos/create-book.dto';
import { UpdateBookDto } from './dtos/update-book.dto';
import { PaginationService } from 'src/common/services/pagination.service';
import { PaginatedResponse, PaginationArgs } from 'src/common/dtos/pagination.dto';

@Injectable()
export class BooksService {
    constructor(
        @InjectRepository(Book)
        private booksRepository: Repository<Book>,
        @InjectRepository(Author)
        private authorsRepository: Repository<Author>,
        private paginationService: PaginationService,
    ) {}
    
    async findAll(paginationArgs: PaginationArgs): Promise<PaginatedResponse<Book>> {
        return this.paginationService.paginate(this.booksRepository, paginationArgs, ['author']);
    }
    
    async findOne(id: string): Promise<Book> {
        return this.booksRepository.findOneBy({id});
    }

    async create(createBookDto: CreateBookDto): Promise<Book> {
        const author = await this.authorsRepository.findOneBy({id: createBookDto.authorId});
        if (!author) {
            throw new NotFoundException(`Author with ID ${createBookDto.authorId} not found`);
        }
        const book = this.booksRepository.create({ ...createBookDto, author });
        return this.booksRepository.save(book);
    }
    
    async update(updateBookDto: UpdateBookDto): Promise<Book> {
        const book = await this.booksRepository.preload(updateBookDto);
        if (!book) {
            throw new NotFoundException(`Book with ID ${updateBookDto.id} not found`);
        }
        return this.booksRepository.save(book);
    }
    
    async remove(id: string): Promise<Book> {
        const book = await this.booksRepository.findOneBy({id});
        if (!book) {
            throw new NotFoundException(`Book with ID ${id} not found`);
        }
        return this.booksRepository.remove(book);
      }
}
