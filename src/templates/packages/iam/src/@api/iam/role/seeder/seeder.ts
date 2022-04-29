import { NestFactory } from '@nestjs/core';
import { ICommandBus } from 'aurora-ts-core';
import { CreateRolesCommand } from '../../../../@apps/iam/role/application/create/create-roles.command';
import { SeederModule } from './seeder.module';
import { roles } from '../../../../@apps/iam/role/infrastructure/seeds/role.seed';

export class Seeder
{
    main()
    {
        NestFactory.createApplicationContext(SeederModule).then(appContext =>
        {
            const commandBus = appContext.get(ICommandBus);
            commandBus.dispatch(new CreateRolesCommand(roles, { timezone: process.env.TZ }));
        });
    }
}
new Seeder().main();