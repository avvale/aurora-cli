import { NestFactory } from '@nestjs/core';
import { ICommandBus } from 'aurora-ts-core';
import { CreatePermissionsCommand } from '../../../../@apps/iam/permission/application/create/create-permissions.command';
import { SeederModule } from './seeder.module';
import { permissions } from '../../../../@apps/iam/permission/infrastructure/seeds/permission.seed';

export class Seeder
{
    main()
    {
        NestFactory.createApplicationContext(SeederModule).then(appContext =>
        {
            const commandBus = appContext.get(ICommandBus);
            commandBus.dispatch(new CreatePermissionsCommand(permissions, { timezone: process.env.TZ }));
        });
    }
}
new Seeder().main();