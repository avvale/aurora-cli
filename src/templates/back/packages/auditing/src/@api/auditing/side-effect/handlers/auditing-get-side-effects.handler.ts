import { Injectable } from '@nestjs/common';
import { IQueryBus, QueryStatement } from '@aurora-ts/core';

// @app
import { GetSideEffectsQuery } from '@app/auditing/side-effect/application/get/get-side-effects.query';
import { AuditingSideEffect } from '@api/graphql';
import { AuditingSideEffectDto } from '../dto';

@Injectable()
export class AuditingGetSideEffectsHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<AuditingSideEffect[] | AuditingSideEffectDto[]>
    {
        return await this.queryBus.ask(new GetSideEffectsQuery(queryStatement, constraint, { timezone }));
    }
}