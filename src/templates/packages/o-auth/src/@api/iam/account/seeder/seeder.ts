import { NestFactory } from '@nestjs/core';
import { ICommandBus } from 'aurora-ts-core';
import { CreateAccountsCommand } from '../../../../@apps/iam/account/application/create/create-accounts.command';
import { SeederModule } from './seeder.module';
import { accounts } from '../../../../@apps/iam/account/infrastructure/seeds/account.seed';

export class Seeder
{
    main()
    {
        NestFactory.createApplicationContext(SeederModule).then(appContext =>
        {
            const commandBus = appContext.get(ICommandBus);
            commandBus.dispatch(new CreateAccountsCommand(accounts, { timezone: process.env.TZ }));
        });
    }
}
new Seeder().main();