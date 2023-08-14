import { OAuthAccessToken } from '@api/graphql';
import { OAuthAccessTokenDto } from '@api/o-auth/access-token';
import { OAuthGetAccessTokensQuery } from '@app/o-auth/access-token';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OAuthGetAccessTokensHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<OAuthAccessToken[] | OAuthAccessTokenDto[]>
    {
        return await this.queryBus.ask(new OAuthGetAccessTokensQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));
    }
}
