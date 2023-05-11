import { NestFactory } from '@nestjs/core';
import { ICommandBus } from '@aurorajs.dev/core';
import { CreateUsersCommand } from '@app/iam/user/application/create/create-users.command';
import { SeederModule } from './seeder.module';
import { users } from '@app/iam/user/infrastructure/mock/mock-user.data';

export class Seeder
{
    main(): void
    {
        NestFactory.createApplicationContext(SeederModule).then(appContext =>
        {
            const commandBus = appContext.get(ICommandBus);
            commandBus.dispatch(new CreateUsersCommand(users, { timezone: process.env.TZ }));
            appContext.close();
        });
    }
}
new Seeder().main();