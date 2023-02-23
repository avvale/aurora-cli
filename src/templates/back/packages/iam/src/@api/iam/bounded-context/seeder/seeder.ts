import { NestFactory } from '@nestjs/core';
import { ICommandBus } from '@aurora-ts/core';
import { CreateBoundedContextsCommand } from '@app/iam/bounded-context/application/create/create-bounded-contexts.command';
import { SeederModule } from './seeder.module';
import { boundedContexts } from '@app/iam/bounded-context/infrastructure/mock/mock-bounded-context.data';

export class Seeder
{
    main(): void
    {
        NestFactory.createApplicationContext(SeederModule).then(appContext =>
        {
            const commandBus = appContext.get(ICommandBus);
            commandBus.dispatch(new CreateBoundedContextsCommand(boundedContexts, { timezone: process.env.TZ }));
            appContext.close();
        });
    }
}
new Seeder().main();