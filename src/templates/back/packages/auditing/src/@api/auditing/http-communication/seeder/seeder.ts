import { NestFactory } from '@nestjs/core';
import { ICommandBus } from '@aurora-ts/core';
import { CreateHttpCommunicationsCommand } from '@app/auditing/http-communication/application/create/create-http-communications.command';
import { SeederModule } from './seeder.module';
import { httpCommunications } from '@app/auditing/http-communication/infrastructure/seeds/http-communication.seed';

export class Seeder
{
    main(): void
    {
        NestFactory.createApplicationContext(SeederModule).then(appContext =>
        {
            const commandBus = appContext.get(ICommandBus);
            commandBus.dispatch(new CreateHttpCommunicationsCommand(httpCommunications, { timezone: process.env.TZ }));
            appContext.close();
        });
    }
}
new Seeder().main();