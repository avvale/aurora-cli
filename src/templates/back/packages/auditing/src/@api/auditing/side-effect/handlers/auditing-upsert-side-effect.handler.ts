import { Injectable } from '@nestjs/common';
import { AuditingMeta, ICommandBus, IQueryBus } from '@aurora-ts/core';

// @app
import { FindSideEffectByIdQuery } from '@app/auditing/side-effect/application/find/find-side-effect-by-id.query';
import { UpsertSideEffectCommand } from '@app/auditing/side-effect/application/upsert/upsert-side-effect.command';
import { AuditingSideEffect, AuditingUpdateSideEffectByIdInput } from '@api/graphql';
import { AuditingSideEffectDto, AuditingUpdateSideEffectByIdDto } from '../dto';

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
        await this.commandBus.dispatch(new UpsertSideEffectCommand(
            payload,
            {
                timezone,
            },
        ));

        return await this.queryBus.ask(new FindSideEffectByIdQuery(
            payload.id,
            {},
            { timezone },
        ));
    }
}