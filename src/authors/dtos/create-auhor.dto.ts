/* eslint-disable prettier/prettier */
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateAuthorDto {
    @Field()
    name: string;

    @Field()
    lastName: string;
}