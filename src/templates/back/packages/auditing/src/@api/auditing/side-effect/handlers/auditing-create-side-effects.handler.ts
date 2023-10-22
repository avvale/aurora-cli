import { AuditingCreateSideEffectDto } from '@api/auditing/side-effect';
import { AuditingCreateSideEffectInput } from '@api/graphql';
import { AuditingCreateSideEffectsCommand } from '@app/auditing/side-effect';
import { ICommandBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

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
        await this.commandBus.dispatch(new AuditingCreateSideEffectsCommand(
            payload,
            {
                timezone,
            },
        ));

        return true;
    }
}
