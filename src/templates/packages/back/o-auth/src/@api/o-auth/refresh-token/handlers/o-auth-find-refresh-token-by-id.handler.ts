import { Injectable } from '@nestjs/common';
import { IQueryBus, QueryStatement } from '@aurora-ts/core';

// @app
import { FindRefreshTokenByIdQuery } from '@app/o-auth/refresh-token/application/find/find-refresh-token-by-id.query';
import { OAuthRefreshToken } from '@api/graphql';
import { OAuthRefreshTokenDto } from '../dto';

@Injectable()
export class OAuthFindRefreshTokenByIdHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        id: string,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<OAuthRefreshToken | OAuthRefreshTokenDto>
    {
        return await this.queryBus.ask(new FindRefreshTokenByIdQuery(id, constraint, { timezone }));
    }
}