import { NestFactory } from '@nestjs/core';
import { ICommandBus } from 'aurora-ts-core';
import { CreateApplicationsCommand } from '../../../../@apps/o-auth/application/application/create/create-applications.command';
import { SeederModule } from './seeder.module';
import { applications } from '../../../../@apps/o-auth/application/infrastructure/seeds/application.seed';

export class Seeder
{
    main()
    {
        NestFactory.createApplicationContext(SeederModule).then(appContext =>
        {
            const commandBus = appContext.get(ICommandBus);
            commandBus.dispatch(new CreateApplicationsCommand(applications, { timezone: process.env.TZ }));
        });
    }
}
new Seeder().main();