import { OAuthRefreshToken } from '@api/graphql';
import { OAuthRefreshTokenDto } from '@api/o-auth/refresh-token';
import { OAuthDeleteRefreshTokensCommand, OAuthGetRefreshTokensQuery } from '@app/o-auth/refresh-token';
import { ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OAuthDeleteRefreshTokensHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<OAuthRefreshToken[] | OAuthRefreshTokenDto[]>
    {
        const refreshTokens = await this.queryBus.ask(new OAuthGetRefreshTokensQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));

        await this.commandBus.dispatch(new OAuthDeleteRefreshTokensCommand(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));

        return refreshTokens;
    }
}
