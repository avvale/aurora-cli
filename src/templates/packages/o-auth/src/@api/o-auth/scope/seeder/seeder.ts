import { NestFactory } from '@nestjs/core';
import { ICommandBus } from 'aurora-ts-core';
import { CreateScopesCommand } from '../../../../@apps/o-auth/scope/application/create/create-scopes.command';
import { SeederModule } from './seeder.module';
import { scopes } from '../../../../@apps/o-auth/scope/infrastructure/seeds/scope.seed';

export class Seeder
{
    main(): void
    {
        NestFactory.createApplicationContext(SeederModule).then(appContext =>
        {
            const commandBus = appContext.get(ICommandBus);
            commandBus.dispatch(new CreateScopesCommand(scopes, { timezone: process.env.TZ }));
        });
    }
}
new Seeder().main();