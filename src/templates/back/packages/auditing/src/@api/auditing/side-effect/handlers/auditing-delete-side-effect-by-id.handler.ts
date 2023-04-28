import { Injectable } from '@nestjs/common';
import { AuditingMeta, ICommandBus, IQueryBus, QueryStatement } from '@aurora-ts/core';

// @app
import { FindSideEffectByIdQuery } from '@app/auditing/side-effect/application/find/find-side-effect-by-id.query';
import { DeleteSideEffectByIdCommand } from '@app/auditing/side-effect/application/delete/delete-side-effect-by-id.command';
import { AuditingSideEffect } from '@api/graphql';
import { AuditingSideEffectDto } from '../dto';

@Injectable()
export class AuditingDeleteSideEffectByIdHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        id: string,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<AuditingSideEffect | AuditingSideEffectDto>
    {
        const sideEffect = await this.queryBus.ask(new FindSideEffectByIdQuery(
            id,
            constraint,
            {
                timezone,
            },
        ));

        await this.commandBus.dispatch(new DeleteSideEffectByIdCommand(
            id,
            constraint,
            {
                timezone,
            },
        ));

        return sideEffect;
    }
}