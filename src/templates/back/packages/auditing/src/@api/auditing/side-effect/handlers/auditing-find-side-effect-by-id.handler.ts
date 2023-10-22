import { AuditingSideEffectDto } from '@api/auditing/side-effect';
import { AuditingSideEffect } from '@api/graphql';
import { AuditingFindSideEffectByIdQuery } from '@app/auditing/side-effect';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

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
        return await this.queryBus.ask(new AuditingFindSideEffectByIdQuery(
            id,
            constraint,
            {
                timezone,
            },
        ));
    }
}
