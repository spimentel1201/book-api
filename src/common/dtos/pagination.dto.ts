/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { InputType, Field, Int } from '@nestjs/graphql';
import { IsOptional, IsPositive, Min } from 'class-validator';

@InputType()
export class PaginationDto {
    @IsOptional()
    @IsPositive()
    @Field(type => Int, { defaultValue: 0 })
    offset: number;

    
    @IsOptional()
    @Min(0)
    @Field(type => Int, { defaultValue: 10 })
    limit: number;
}