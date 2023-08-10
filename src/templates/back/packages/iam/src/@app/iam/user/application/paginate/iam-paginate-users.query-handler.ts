import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PaginationResponse } from '@aurorajs.dev/core';
import { IamPaginateUsersQuery } from './iam-paginate-users.query';
import { IamPaginateUsersService } from './iam-paginate-users.service';

@QueryHandler(IamPaginateUsersQuery)
export class IamPaginateUsersQueryHandler implements IQueryHandler<IamPaginateUsersQuery>
{
    constructor(
        private readonly paginateUsersService: IamPaginateUsersService,
    ) {}

    async execute(query: IamPaginateUsersQuery): Promise<PaginationResponse>
    {
        const { total, count, rows } = await this.paginateUsersService.main(
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
