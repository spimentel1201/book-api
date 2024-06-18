/* eslint-disable prettier/prettier */
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateBookDto {
    @Field()
    title: string;

    @Field()
    description: string;

    @Field()
    authorId: string;
}