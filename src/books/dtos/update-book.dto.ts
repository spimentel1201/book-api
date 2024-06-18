/* eslint-disable prettier/prettier */
import { InputType, Field, PartialType } from '@nestjs/graphql';
import { CreateBookDto } from './create-book.dto';

@InputType()
export class UpdateBookDto extends PartialType(CreateBookDto) {
    @Field()
    id: string;
}