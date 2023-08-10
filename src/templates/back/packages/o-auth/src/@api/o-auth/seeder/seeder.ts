import { IamCreateBoundedContextsCommand } from '@app/iam/bounded-context';
import { IamCreatePermissionsCommand } from '@app/iam/permission';
import { boundedContexts, permissions } from '@app/o-auth/o-auth.seed';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { NestFactory } from '@nestjs/core';
import { SeederModule } from './seeder.module';

export class Seeder
{
    main(): void
    {
        NestFactory.createApplicationContext(SeederModule).then(async appContext =>
        {
            const commandBus            = appContext.get(ICommandBus);
            const queryBus              = appContext.get(IQueryBus);

            // create bounded contexts and permissions
            commandBus.dispatch(new IamCreateBoundedContextsCommand(boundedContexts, { timezone: process.env.TZ }));
            commandBus.dispatch(new IamCreatePermissionsCommand(permissions, { timezone: process.env.TZ }));

            appContext.close();
        });
    }
}
new Seeder().main();