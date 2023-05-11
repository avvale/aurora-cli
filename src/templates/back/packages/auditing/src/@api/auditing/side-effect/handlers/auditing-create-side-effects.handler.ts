import { Injectable } from '@nestjs/common';
import { AuditingMeta, ICommandBus } from '@aurorajs.dev/core';

// @app
import { CreateSideEffectsCommand } from '@app/auditing/side-effect/application/create/create-side-effects.command';
import { AuditingCreateSideEffectInput } from '@api/graphql';
import { AuditingCreateSideEffectDto } from '../dto';

@Injectable()
export class AuditingCreateSideEffectsHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    async main(
        payload: AuditingCreateSideEffectInput[] | AuditingCreateSideEffectDto[],
        timezone?: string,
    ): Promise<boolean>
    {
        await this.commandBus.dispatch(new CreateSideEffectsCommand(
            payload,
            {
                timezone,
            },
        ));
        return true;
    }
}