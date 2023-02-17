import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus, QueryStatement } from '@aurora-ts/core';

// @app
import { GetSideEffectsQuery } from '@app/auditing/side-effect/application/get/get-side-effects.query';
import { UpdateSideEffectsCommand } from '@app/auditing/side-effect/application/update/update-side-effects.command';
import { AuditingSideEffect, AuditingUpdateSideEffectsInput } from '@api/graphql';
import { AuditingSideEffectDto, AuditingUpdateSideEffectsDto } from '../dto';

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
        await this.commandBus.dispatch(new UpdateSideEffectsCommand(
            payload,
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));

        return await this.queryBus.ask(new GetSideEffectsQuery(queryStatement, constraint, { timezone }));
    }
}