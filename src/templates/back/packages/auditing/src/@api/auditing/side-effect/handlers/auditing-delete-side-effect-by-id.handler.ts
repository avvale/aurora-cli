import { AuditingSideEffectDto } from '@api/auditing/side-effect';
import { AuditingSideEffect } from '@api/graphql';
import {
    AuditingDeleteSideEffectByIdCommand,
    AuditingFindSideEffectByIdQuery,
} from '@app/auditing/side-effect';
import { ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuditingDeleteSideEffectByIdHandler {
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        id: string,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<AuditingSideEffect | AuditingSideEffectDto> {
        const sideEffect = await this.queryBus.ask(
            new AuditingFindSideEffectByIdQuery(id, constraint, {
                timezone,
            }),
        );

        await this.commandBus.dispatch(
            new AuditingDeleteSideEffectByIdCommand(id, constraint, {
                timezone,
            }),
        );

        return sideEffect;
    }
}
