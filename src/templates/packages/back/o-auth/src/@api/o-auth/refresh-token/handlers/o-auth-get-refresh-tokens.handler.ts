import { Injectable } from '@nestjs/common';
import { IQueryBus, QueryStatement } from '@aurora-ts/core';

// @app
import { GetRefreshTokensQuery } from '@app/o-auth/refresh-token/application/get/get-refresh-tokens.query';
import { OAuthRefreshToken } from '@api/graphql';
import { OAuthRefreshTokenDto } from '../dto';

@Injectable()
export class OAuthGetRefreshTokensHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<OAuthRefreshToken[] | OAuthRefreshTokenDto[]>
    {
        return await this.queryBus.ask(new GetRefreshTokensQuery(queryStatement, constraint, { timezone }));
    }
}