import { Pagination } from '@api/graphql';
import { AuditingPaginateSideEffectsQuery } from '@app/auditing/side-effect';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuditingPaginateSideEffectsHandler {
    constructor(private readonly queryBus: IQueryBus) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<Pagination> {
        return await this.queryBus.ask(
            new AuditingPaginateSideEffectsQuery(queryStatement, constraint, {
                timezone,
            }),
        );
    }
}
