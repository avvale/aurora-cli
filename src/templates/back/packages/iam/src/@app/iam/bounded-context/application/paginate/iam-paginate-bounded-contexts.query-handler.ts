import { IamPaginateBoundedContextsQuery } from '@app/iam/bounded-context';
import { IamPaginateBoundedContextsService } from '@app/iam/bounded-context/application/paginate/iam-paginate-bounded-contexts.service';
import { PaginationResponse } from '@aurorajs.dev/core';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(IamPaginateBoundedContextsQuery)
export class IamPaginateBoundedContextsQueryHandler implements IQueryHandler<IamPaginateBoundedContextsQuery>
{
    constructor(
        private readonly paginateBoundedContextsService: IamPaginateBoundedContextsService,
    ) {}

    async execute(query: IamPaginateBoundedContextsQuery): Promise<PaginationResponse>
    {
        const { total, count, rows } = await this.paginateBoundedContextsService.main(
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
