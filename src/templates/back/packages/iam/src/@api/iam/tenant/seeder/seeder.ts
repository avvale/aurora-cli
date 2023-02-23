import { NestFactory } from '@nestjs/core';
import { ICommandBus } from '@aurora-ts/core';
import { CreateTenantsCommand } from '@app/iam/tenant/application/create/create-tenants.command';
import { SeederModule } from './seeder.module';
import { tenants } from '@app/iam/tenant/infrastructure/seeds/tenant.seed';

export class Seeder
{
    main(): void
    {
        NestFactory.createApplicationContext(SeederModule).then(appContext =>
        {
            const commandBus = appContext.get(ICommandBus);
            commandBus.dispatch(new CreateTenantsCommand(tenants, { timezone: process.env.TZ }));
            appContext.close();
        });
    }
}
new Seeder().main();