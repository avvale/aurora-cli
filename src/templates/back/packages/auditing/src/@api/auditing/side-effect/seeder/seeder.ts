import { NestFactory } from '@nestjs/core';
import { ICommandBus } from '@aurora-ts/core';
import { CreateSideEffectsCommand } from '@app/auditing/side-effect/application/create/create-side-effects.command';
import { SeederModule } from './seeder.module';
import { sideEffects } from '@app/auditing/side-effect/infrastructure/seeds/side-effect.seed';

export class Seeder
{
    main(): void
    {
        NestFactory.createApplicationContext(SeederModule).then(appContext =>
        {
            const commandBus = appContext.get(ICommandBus);
            commandBus.dispatch(new CreateSideEffectsCommand(sideEffects, { timezone: process.env.TZ }));
            appContext.close();
        });
    }
}
new Seeder().main();