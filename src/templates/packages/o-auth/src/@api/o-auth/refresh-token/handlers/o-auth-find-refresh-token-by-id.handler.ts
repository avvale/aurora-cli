import { Injectable } from '@nestjs/common';
import { IQueryBus, QueryStatement } from 'aurora-ts-core';

// @apps
import { FindRefreshTokenByIdQuery } from '../../../../@apps/o-auth/refresh-token/application/find/find-refresh-token-by-id.query';
import { OAuthRefreshToken } from '../../../../../graphql';
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