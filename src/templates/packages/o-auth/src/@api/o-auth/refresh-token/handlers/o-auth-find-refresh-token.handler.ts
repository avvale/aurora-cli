import { Injectable } from '@nestjs/common';
import { IQueryBus, QueryStatement } from 'aurora-ts-core';

// @apps
import { FindRefreshTokenQuery } from '../../../../@apps/o-auth/refresh-token/application/find/find-refresh-token.query';
import { OAuthRefreshToken } from '../../../../graphql';
import { OAuthRefreshTokenDto } from '../dto';

@Injectable()
export class OAuthFindRefreshTokenHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<OAuthRefreshToken | OAuthRefreshTokenDto>
    {
        return await this.queryBus.ask(new FindRefreshTokenQuery(queryStatement, constraint, { timezone }));
    }
}