import { Injectable } from '@nestjs/common';
import { IQueryBus, QueryStatement } from 'aurora-ts-core';

// @apps
import { GetAccessTokensQuery } from '@apps/o-auth/access-token/application/get/get-access-tokens.query';
import { OAuthAccessToken } from '../../../../graphql';
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