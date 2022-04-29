import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PaginationResponse } from 'aurora-ts-core';
import { PaginateApplicationsQuery } from './paginate-applications.query';
import { PaginateApplicationsService } from './paginate-applications.service';

@QueryHandler(PaginateApplicationsQuery)
export class PaginateApplicationsQueryHandler implements IQueryHandler<PaginateApplicationsQuery>
{
    constructor(
        private readonly paginateApplicationsService: PaginateApplicationsService,
    ) {}

    async execute(query: PaginateApplicationsQuery): Promise<PaginationResponse>
    {
        const { total, count, rows } = await this.paginateApplicationsService.main(query.queryStatement, query.constraint, query.cQMetadata);

        return new PaginationResponse(
            total,
            count,
            rows.map(item => item.toDTO())
        );
    }
}