/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { InputType, Field, PartialType } from '@nestjs/graphql';
import { CreateAuthorDto } from './create-auhor.dto';

@InputType()
export class UpdateAuthorDto extends PartialType(CreateAuthorDto){
    @Field(type => String)
    id: string;
}