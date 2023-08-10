import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PaginationResponse } from '@aurorajs.dev/core';
import { IamPaginatePermissionsQuery } from './iam-paginate-permissions.query';
import { IamPaginatePermissionsService } from './iam-paginate-permissions.service';

@QueryHandler(IamPaginatePermissionsQuery)
export class IamPaginatePermissionsQueryHandler implements IQueryHandler<IamPaginatePermissionsQuery>
{
    constructor(
        private readonly paginatePermissionsService: IamPaginatePermissionsService,
    ) {}

    async execute(query: IamPaginatePermissionsQuery): Promise<PaginationResponse>
    {
        const { total, count, rows } = await this.paginatePermissionsService.main(
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
