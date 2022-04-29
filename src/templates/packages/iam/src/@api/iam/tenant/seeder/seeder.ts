import { NestFactory } from '@nestjs/core';
import { ICommandBus } from 'aurora-ts-core';
import { CreateTenantsCommand } from '../../../../@apps/iam/tenant/application/create/create-tenants.command';
import { SeederModule } from './seeder.module';
import { tenants } from '../../../../@apps/iam/tenant/infrastructure/seeds/tenant.seed';

export class Seeder
{
    main()
    {
        NestFactory.createApplicationContext(SeederModule).then(appContext =>
        {
            const commandBus = appContext.get(ICommandBus);
            commandBus.dispatch(new CreateTenantsCommand(tenants, { timezone: process.env.TZ }));
        });
    }
}
new Seeder().main();