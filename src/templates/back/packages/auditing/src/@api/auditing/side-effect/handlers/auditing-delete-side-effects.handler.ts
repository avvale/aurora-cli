import { AuditingSideEffectDto } from '@api/auditing/side-effect';
import { AuditingSideEffect } from '@api/graphql';
import { AuditingDeleteSideEffectsCommand, AuditingGetSideEffectsQuery } from '@app/auditing/side-effect';
import { ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuditingDeleteSideEffectsHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<AuditingSideEffect[] | AuditingSideEffectDto[]>
    {
        const sideEffects = await this.queryBus.ask(new AuditingGetSideEffectsQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));

        await this.commandBus.dispatch(new AuditingDeleteSideEffectsCommand(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));

        return sideEffects;
    }
}
