import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';

//
import { accessTokens } from '@app/o-auth/access-token/infrastructure/mock/mock-access-token.data';

@Injectable()
export class OAuthAccessTokenSeeder
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(): Promise<boolean>
    {
       /*  await this.commandBus.dispatch(new CreateAccessTokensCommand(
            accessTokens,
            {
                timezone: process.env.TZ ,
            },
        )); */

        return true;
    }
}