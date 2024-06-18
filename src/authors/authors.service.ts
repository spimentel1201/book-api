/* eslint-disable prettier/prettier */
import { Author } from './entities/author.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAuthorDto } from './dtos/create-auhor.dto';
import { UpdateAuthorDto } from './dtos/update-author.dto';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class AuthorsService {
    constructor(
        @InjectRepository(Author)
        private authorsRepository: Repository<Author>,
    ) {}
    
    async create(createAuthorDto: CreateAuthorDto): Promise<Author> {
        const newAuthor = this.authorsRepository.create(createAuthorDto);
        return this.authorsRepository.save(newAuthor);
    }
    
    async findAll(): Promise<Author[]> {
        return this.authorsRepository.find();
    }
    
    async findOne(id: string): Promise<Author> {
        return this.authorsRepository.findOneBy({id});
    }

    async update(updateAuthorDto: UpdateAuthorDto): Promise<Author> {
        const updatedAuthor = await this.authorsRepository.preload(updateAuthorDto);
        if(!updatedAuthor) throw new NotFoundException(`Author with ${updateAuthorDto.id} not found`);
        return this.authorsRepository.save(updatedAuthor)
    }

    async remove(id: string): Promise<any> {
        const author = await this.authorsRepository.findOneBy({id});
        if (!author) {
        throw new NotFoundException(`Author with ID ${id} not found`);
        }
        return this.authorsRepository.remove(author);
    }
}
