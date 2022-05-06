import { NestFactory } from '@nestjs/core';
import { ICommandBus } from 'aurora-ts-core';
import { SeederModule } from './seeder.module';
import { accessTokens } from '../../../../@apps/o-auth/access-token/infrastructure/seeds/access-token.seed';

export class Seeder
{
    main(): void
    {
        /*  NestFactory.createApplicationContext(SeederModule).then(appContext =>
        {
            const commandBus = appContext.get(ICommandBus);
            commandBus.dispatch(new CreateAccessTokensCommand(accessTokens, { timezone: process.env.TZ }));
        }); */
        console.log('CreateAccessTokensCommand not defined');
    }
}
new Seeder().main();