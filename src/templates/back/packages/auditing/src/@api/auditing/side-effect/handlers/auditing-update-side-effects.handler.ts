import { AuditingSideEffectDto, AuditingUpdateSideEffectsDto } from '@api/auditing/side-effect';
import { AuditingSideEffect, AuditingUpdateSideEffectsInput } from '@api/graphql';
import { AuditingGetSideEffectsQuery, AuditingUpdateSideEffectsCommand } from '@app/auditing/side-effect';
import { ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuditingUpdateSideEffectsHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: AuditingUpdateSideEffectsInput | AuditingUpdateSideEffectsDto,
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<AuditingSideEffect | AuditingSideEffectDto>
    {
        await this.commandBus.dispatch(new AuditingUpdateSideEffectsCommand(
            payload,
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));

        return await this.queryBus.ask(new AuditingGetSideEffectsQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));
    }
}
