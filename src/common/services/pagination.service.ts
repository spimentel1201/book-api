/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { PaginationArgs, PaginatedResponse, PageInfo } from '../dtos/pagination.dto';
import { EntityId } from '../interfaces/entity-id.interface';

@Injectable()
export class PaginationService {
    async paginate<T extends EntityId>(
        repository: Repository<T>,
        paginationArgs: PaginationArgs,
        relations: string[] = [],
    ): Promise<PaginatedResponse<T>> {
        const { first, last, after, before } = paginationArgs;
        const query = repository.createQueryBuilder('entity').leftJoinAndSelect(relations.join(','), 'relation');

        if (after) {
        query.andWhere('entity.id > :after', { after });
        }
        if (before) {
        query.andWhere('entity.id < :before', { before });
        }

        if (first) {
            query.take(first);
        } else if (last) {
            query.take(last);
            query.orderBy('entity.id', 'DESC');
        }

        const entities = await query.getMany();

        const pageInfo: PageInfo = {
            hasNextPage: entities.length === (first || last),
            hasPreviousPage: Boolean(after || before),
            startCursor: entities.length > 0 ? entities[0].id : null,
            endCursor: entities.length > 0 ? entities[entities.length - 1].id : null,
        };

        return { edges: entities, pageInfo };
    }
}
