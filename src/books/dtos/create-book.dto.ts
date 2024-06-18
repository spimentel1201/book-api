/* eslint-disable prettier/prettier */
import { InputType, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class CreateBookDto {
    @IsString()
    @Field()
    title: string;

    @IsString()
    @Field()
    description: string;
    
    @IsString()
    @Field()
    authorId: string;
}