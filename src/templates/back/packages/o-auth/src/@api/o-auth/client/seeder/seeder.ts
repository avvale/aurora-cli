import { NestFactory } from '@nestjs/core';
import { ICommandBus } from '@aurorajs.dev/core';
import { CreateClientsCommand } from '@app/o-auth/client/application/create/create-clients.command';
import { SeederModule } from './seeder.module';
import { clients } from '@app/o-auth/client/infrastructure/mock/mock-client.data';

export class Seeder
{
    main(): void
    {
        NestFactory.createApplicationContext(SeederModule).then(appContext =>
        {
            const commandBus = appContext.get(ICommandBus);
            commandBus.dispatch(new CreateClientsCommand(clients, { timezone: process.env.TZ }));
            appContext.close();
        });
    }
}
new Seeder().main();