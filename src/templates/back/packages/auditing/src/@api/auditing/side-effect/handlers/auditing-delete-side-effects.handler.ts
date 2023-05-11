import { Injectable } from '@nestjs/common';
import { AuditingMeta, ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';

// @app
import { GetSideEffectsQuery } from '@app/auditing/side-effect/application/get/get-side-effects.query';
import { DeleteSideEffectsCommand } from '@app/auditing/side-effect/application/delete/delete-side-effects.command';
import { AuditingSideEffect } from '@api/graphql';
import { AuditingSideEffectDto } from '../dto';

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
        const sideEffects = await this.queryBus.ask(new GetSideEffectsQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));

        await this.commandBus.dispatch(new DeleteSideEffectsCommand(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));

        return sideEffects;
    }
}