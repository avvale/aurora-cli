import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';

//
import { CreateSideEffectsCommand } from '@app/auditing/side-effect/application/create/create-side-effects.command';
import { sideEffects } from '@app/auditing/side-effect/infrastructure/mock/mock-side-effect.data';

@Injectable()
export class AuditingSideEffectSeeder
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(): Promise<boolean>
    {
        await this.commandBus.dispatch(new CreateSideEffectsCommand(
            sideEffects,
            {
                timezone: process.env.TZ ,
            },
        ));

        return true;
    }
}