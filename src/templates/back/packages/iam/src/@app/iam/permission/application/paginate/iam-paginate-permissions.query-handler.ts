import { IamPaginatePermissionsQuery } from '@app/iam/permission';
import { IamPaginatePermissionsService } from '@app/iam/permission/application/paginate/iam-paginate-permissions.service';
import { PaginationResponse } from '@aurorajs.dev/core';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

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
