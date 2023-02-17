import { Injectable } from '@nestjs/common';
import { IQueryBus, QueryStatement } from '@aurora-ts/core';

// @app
import { FindSideEffectQuery } from '@app/auditing/side-effect/application/find/find-side-effect.query';
import { AuditingSideEffect } from '@api/graphql';
import { AuditingSideEffectDto } from '../dto';

@Injectable()
export class AuditingFindSideEffectHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<AuditingSideEffect | AuditingSideEffectDto>
    {
        return await this.queryBus.ask(new FindSideEffectQuery(queryStatement, constraint, { timezone }));
    }
}