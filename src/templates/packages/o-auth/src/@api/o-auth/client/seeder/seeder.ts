import { NestFactory } from '@nestjs/core';
import { ICommandBus } from 'aurora-ts-core';
import { CreateClientsCommand } from '../../../../@apps/o-auth/client/application/create/create-clients.command';
import { SeederModule } from './seeder.module';
import { clients } from '../../../../@apps/o-auth/client/infrastructure/seeds/client.seed';

export class Seeder
{
    main(): void
    {
        NestFactory.createApplicationContext(SeederModule).then(appContext =>
        {
            const commandBus = appContext.get(ICommandBus);
            commandBus.dispatch(new CreateClientsCommand(clients, { timezone: process.env.TZ }));
        });
    }
}
new Seeder().main();