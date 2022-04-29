import { NestFactory } from '@nestjs/core';
import { ICommandBus } from 'aurora-ts-core';
import { CreateRefreshTokensCommand } from '../../../../@apps/o-auth/refresh-token/application/create/create-refresh-tokens.command';
import { SeederModule } from './seeder.module';
import { refreshTokens } from '../../../../@apps/o-auth/refresh-token/infrastructure/seeds/refresh-token.seed';

export class Seeder
{
    main()
    {
        NestFactory.createApplicationContext(SeederModule).then(appContext =>
        {
            const commandBus = appContext.get(ICommandBus);
            commandBus.dispatch(new CreateRefreshTokensCommand(refreshTokens, { timezone: process.env.TZ }));
        });
    }
}
new Seeder().main();