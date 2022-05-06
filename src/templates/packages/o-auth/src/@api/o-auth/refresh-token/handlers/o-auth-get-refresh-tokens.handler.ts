import { Injectable } from '@nestjs/common';
import { IQueryBus, QueryStatement } from 'aurora-ts-core';

// @apps
import { GetRefreshTokensQuery } from '../../../../@apps/o-auth/refresh-token/application/get/get-refresh-tokens.query';
import { OAuthRefreshToken } from '../../../../../graphql';
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