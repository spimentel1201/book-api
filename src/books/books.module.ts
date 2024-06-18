/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksResolver } from './books.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Author } from 'src/authors/entities/author.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Book, Author])],
  providers: [BooksService, BooksResolver]
})
export class BooksModule {}
