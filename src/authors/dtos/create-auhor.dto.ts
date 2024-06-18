/* eslint-disable prettier/prettier */
import { InputType, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class CreateAuthorDto {
    @IsString()
    @Field()
    name: string;

    @IsString()
    @Field()
    lastName: string;
}