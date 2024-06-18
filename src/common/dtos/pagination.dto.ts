/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { InputType, Field, ObjectType } from '@nestjs/graphql';

@InputType()
export class PaginationArgs {
    @Field({ nullable: true })
    after?: string;

    @Field({ nullable: true })
    before?: string;

    @Field({ defaultValue: 10 })
    first?: number;

    @Field({ defaultValue: 10 })
    last?: number;
}

@ObjectType()
export class PageInfo {
    @Field()
    hasNextPage: boolean;

    @Field()
    hasPreviousPage: boolean;

    @Field({ nullable: true })
    startCursor?: string;

    @Field({ nullable: true })
    endCursor?: string;
}

@ObjectType()
export class PaginatedResponse<T> {
    @Field(type => [T])
    edges: T[];

    @Field()
    pageInfo: PageInfo;
}
