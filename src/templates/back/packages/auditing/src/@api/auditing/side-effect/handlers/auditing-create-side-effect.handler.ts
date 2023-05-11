import { Injectable } from '@nestjs/common';
import { AuditingMeta, ICommandBus, IQueryBus } from '@aurorajs.dev/core';

// @app
import { FindSideEffectByIdQuery } from '@app/auditing/side-effect/application/find/find-side-effect-by-id.query';
import { CreateSideEffectCommand } from '@app/auditing/side-effect/application/create/create-side-effect.command';
import { AuditingSideEffect, AuditingCreateSideEffectInput } from '@api/graphql';
import { AuditingSideEffectDto, AuditingCreateSideEffectDto } from '../dto';

@Injectable()
export class AuditingCreateSideEffectHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: AuditingCreateSideEffectInput | AuditingCreateSideEffectDto,
        timezone?: string,
    ): Promise<AuditingSideEffect | AuditingSideEffectDto>
    {
        await this.commandBus.dispatch(new CreateSideEffectCommand(
            payload,
            {
                timezone,
            },
        ));

        return await this.queryBus.ask(new FindSideEffectByIdQuery(
            payload.id,
            {},
            {
                timezone,
            },
        ));
    }
}