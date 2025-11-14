import {
    AuditingCreateSideEffectDto,
    AuditingSideEffectDto,
} from '@api/auditing/side-effect';
import {
    AuditingCreateSideEffectInput,
    AuditingSideEffect,
} from '@api/graphql';
import {
    AuditingCreateSideEffectCommand,
    AuditingFindSideEffectByIdQuery,
} from '@app/auditing/side-effect';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuditingCreateSideEffectHandler {
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: AuditingCreateSideEffectInput | AuditingCreateSideEffectDto,
        timezone?: string,
    ): Promise<AuditingSideEffect | AuditingSideEffectDto> {
        await this.commandBus.dispatch(
            new AuditingCreateSideEffectCommand(payload, {
                timezone,
            }),
        );

        return await this.queryBus.ask(
            new AuditingFindSideEffectByIdQuery(
                payload.id,
                {},
                {
                    timezone,
                },
            ),
        );
    }
}
