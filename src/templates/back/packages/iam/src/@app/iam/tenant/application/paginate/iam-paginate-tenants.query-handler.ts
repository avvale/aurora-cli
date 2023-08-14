import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PaginationResponse } from '@aurorajs.dev/core';
import { IamPaginateTenantsQuery } from './iam-paginate-tenants.query';
import { IamPaginateTenantsService } from './iam-paginate-tenants.service';

@QueryHandler(IamPaginateTenantsQuery)
export class IamPaginateTenantsQueryHandler implements IQueryHandler<IamPaginateTenantsQuery>
{
    constructor(
        private readonly paginateTenantsService: IamPaginateTenantsService,
    ) {}

    async execute(query: IamPaginateTenantsQuery): Promise<PaginationResponse>
    {
        const { total, count, rows } = await this.paginateTenantsService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );

        return new PaginationResponse(
            total,
            count,
            rows.map(item => item.toDTO()),
        );
    }
}
