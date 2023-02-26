import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus } from '@aurora-ts/core';

//
import { refreshTokens } from '@app/o-auth/refresh-token/infrastructure/mock/mock-refresh-token.data';

@Injectable()
export class OAuthRefreshTokenSeeder
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(): Promise<boolean>
    {
        /* await this.commandBus.dispatch(new CreateRefreshTokensCommand(
            refreshTokens,
            {
                timezone: process.env.TZ ,
            },
        )); */

        return true;
    }
}