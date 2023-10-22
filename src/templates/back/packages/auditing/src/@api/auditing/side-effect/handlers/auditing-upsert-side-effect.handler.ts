import { AuditingSideEffectDto, AuditingUpdateSideEffectByIdDto } from '@api/auditing/side-effect';
import { AuditingSideEffect, AuditingUpdateSideEffectByIdInput } from '@api/graphql';
import { AuditingFindSideEffectByIdQuery, AuditingUpsertSideEffectCommand } from '@app/auditing/side-effect';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuditingUpsertSideEffectHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: AuditingUpdateSideEffectByIdInput | AuditingUpdateSideEffectByIdDto,
        timezone?: string,
    ): Promise<AuditingSideEffect | AuditingSideEffectDto>
    {
        await this.commandBus.dispatch(new AuditingUpsertSideEffectCommand(
            payload,
            {
                timezone,
            },
        ));

        return await this.queryBus.ask(new AuditingFindSideEffectByIdQuery(
            payload.id,
            {},
            {
                timezone,
            },
        ));
    }
}
