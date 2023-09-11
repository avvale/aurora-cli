import { IamPaginateUsersQuery } from '@app/iam/user';
import { IamPaginateUsersService } from '@app/iam/user/application/paginate/iam-paginate-users.service';
import { PaginationResponse } from '@aurorajs.dev/core';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

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
