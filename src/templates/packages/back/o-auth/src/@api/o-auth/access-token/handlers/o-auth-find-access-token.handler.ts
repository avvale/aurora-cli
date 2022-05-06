import { Injectable } from '@nestjs/common';
import { IQueryBus, QueryStatement } from 'aurora-ts-core';

// @apps
import { FindAccessTokenQuery } from '@apps/o-auth/access-token/application/find/find-access-token.query';
import { OAuthAccessToken } from '../../../../graphql';
import { OAuthAccessTokenDto } from '../dto';

@Injectable()
export class OAuthFindAccessTokenHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<OAuthAccessToken | OAuthAccessTokenDto>
    {
        return await this.queryBus.ask(new FindAccessTokenQuery(queryStatement, constraint, { timezone }));
    }
}