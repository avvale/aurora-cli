import { Injectable } from '@nestjs/common';
import { IQueryBus, QueryStatement } from '@aurora-ts/core';

// @app
import { GetAccessTokensQuery } from '@app/o-auth/access-token/application/get/get-access-tokens.query';
import { OAuthAccessToken } from '@api/graphql';
import { OAuthAccessTokenDto } from '../dto';

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
        return await this.queryBus.ask(new GetAccessTokensQuery(queryStatement, constraint, { timezone }));
    }
}