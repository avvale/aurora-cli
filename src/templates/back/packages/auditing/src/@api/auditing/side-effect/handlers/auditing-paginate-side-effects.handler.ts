import { Injectable } from '@nestjs/common';
import { IQueryBus, QueryStatement } from '@aurora-ts/core';

// @app
import { PaginateSideEffectsQuery } from '@app/auditing/side-effect/application/paginate/paginate-side-effects.query';
import { Pagination } from '@api/graphql';

@Injectable()
export class AuditingPaginateSideEffectsHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<Pagination>
    {
        return await this.queryBus.ask(new PaginateSideEffectsQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));
    }
}