import { NestFactory } from '@nestjs/core';
import { ICommandBus } from '@aurora-ts/core';
import { CreatePermissionsCommand } from '@app/iam/permission/application/create/create-permissions.command';
import { SeederModule } from './seeder.module';
import { permissions } from '@app/iam/permission/infrastructure/seeds/permission.seed';

export class Seeder
{
    main(): void
    {
        NestFactory.createApplicationContext(SeederModule).then(appContext =>
        {
            const commandBus = appContext.get(ICommandBus);
            commandBus.dispatch(new CreatePermissionsCommand(permissions, { timezone: process.env.TZ }));
        });
    }
}
new Seeder().main();