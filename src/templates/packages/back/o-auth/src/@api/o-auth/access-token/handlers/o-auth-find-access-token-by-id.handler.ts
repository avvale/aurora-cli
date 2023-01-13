import { Injectable } from '@nestjs/common';
import { IQueryBus, QueryStatement } from '@aurora-ts/core';

// @app
import { FindAccessTokenByIdQuery } from '@app/o-auth/access-token/application/find/find-access-token-by-id.query';
import { OAuthAccessToken } from '@api/graphql';
import { OAuthAccessTokenDto } from '../dto';

@Injectable()
export class OAuthFindAccessTokenByIdHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        id: string,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<OAuthAccessToken | OAuthAccessTokenDto>
    {
        return await this.queryBus.ask(new FindAccessTokenByIdQuery(id, constraint, { timezone }));
    }
}