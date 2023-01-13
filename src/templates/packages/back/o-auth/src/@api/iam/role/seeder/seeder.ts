import { NestFactory } from '@nestjs/core';
import { ICommandBus } from '@aurora-ts/core';
import { CreateRolesCommand } from '@app/iam/role/application/create/create-roles.command';
import { SeederModule } from './seeder.module';
import { roles } from '@app/iam/role/infrastructure/seeds/role.seed';

export class Seeder
{
    main(): void
    {
        NestFactory.createApplicationContext(SeederModule).then(appContext =>
        {
            const commandBus = appContext.get(ICommandBus);
            commandBus.dispatch(new CreateRolesCommand(roles, { timezone: process.env.TZ }));
        });
    }
}
new Seeder().main();