import { OAuthAccessToken } from '@api/graphql';
import { OAuthAccessTokenDto } from '@api/o-auth/access-token';
import { OAuthDeleteAccessTokensCommand, OAuthGetAccessTokensQuery } from '@app/o-auth/access-token';
import { ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OAuthDeleteAccessTokensHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<OAuthAccessToken[] | OAuthAccessTokenDto[]>
    {
        const accessTokens = await this.queryBus.ask(new OAuthGetAccessTokensQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));

        await this.commandBus.dispatch(new OAuthDeleteAccessTokensCommand(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));

        return accessTokens;
    }
}
