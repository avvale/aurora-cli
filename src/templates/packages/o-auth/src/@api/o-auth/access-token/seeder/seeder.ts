import { NestFactory } from '@nestjs/core';
import { ICommandBus } from 'aurora-ts-core';
import { CreateAccessTokensCommand } from '../../../../@apps/o-auth/access-token/application/create/create-access-tokens.command';
import { SeederModule } from './seeder.module';
import { accessTokens } from '../../../../@apps/o-auth/access-token/infrastructure/seeds/access-token.seed';

export class Seeder
{
    main()
    {
        NestFactory.createApplicationContext(SeederModule).then(appContext =>
        {
            const commandBus = appContext.get(ICommandBus);
            commandBus.dispatch(new CreateAccessTokensCommand(accessTokens, { timezone: process.env.TZ }));
        });
    }
}
new Seeder().main();