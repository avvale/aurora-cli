import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PaginationResponse } from '@aurorajs.dev/core';
import { IamPaginateBoundedContextsQuery } from './iam-paginate-bounded-contexts.query';
import { IamPaginateBoundedContextsService } from './iam-paginate-bounded-contexts.service';

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
