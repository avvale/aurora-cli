import { NestFactory } from '@nestjs/core';
import { ICommandBus, IQueryBus } from '@aurora-ts/core';
import { SeederModule } from './seeder.module';

// sources
import { CreatePermissionsCommand } from '@app/iam/permission/application/create/create-permissions.command';
import { CreateBoundedContextsCommand } from '@app/iam/bounded-context/application/create/create-bounded-contexts.command';
import { boundedContexts, permissions } from '@app/o-auth/o-auth.seed';

export class Seeder
{
    main(): void
    {
        NestFactory.createApplicationContext(SeederModule).then(async appContext =>
        {
            const commandBus            = appContext.get(ICommandBus);
            const queryBus              = appContext.get(IQueryBus);

            // create bounded contexts and permissions
            commandBus.dispatch(new CreateBoundedContextsCommand(boundedContexts, { timezone: process.env.TZ }));
            commandBus.dispatch(new CreatePermissionsCommand(permissions, { timezone: process.env.TZ }));

            appContext.close();
        });
    }
}
new Seeder().main();