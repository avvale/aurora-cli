import { Injectable } from '@nestjs/common';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';

// @app
import { FindSideEffectByIdQuery } from '@app/auditing/side-effect/application/find/find-side-effect-by-id.query';
import { AuditingSideEffect } from '@api/graphql';
import { AuditingSideEffectDto } from '../dto';

@Injectable()
export class AuditingFindSideEffectByIdHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        id: string,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<AuditingSideEffect | AuditingSideEffectDto>
    {
        return await this.queryBus.ask(new FindSideEffectByIdQuery(
            id,
            constraint,
            {
                timezone,
            },
        ));
    }
}