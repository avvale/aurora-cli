import { OAuthRefreshToken } from '@api/graphql';
import { OAuthRefreshTokenDto } from '@api/o-auth/refresh-token';
import { OAuthGetRefreshTokensQuery } from '@app/o-auth/refresh-token';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OAuthGetRefreshTokensHandler {
    constructor(private readonly queryBus: IQueryBus) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<OAuthRefreshToken[] | OAuthRefreshTokenDto[]> {
        return await this.queryBus.ask(
            new OAuthGetRefreshTokensQuery(queryStatement, constraint, {
                timezone,
            }),
        );
    }
}
