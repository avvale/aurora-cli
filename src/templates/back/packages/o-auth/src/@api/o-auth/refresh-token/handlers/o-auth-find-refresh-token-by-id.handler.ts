import { OAuthRefreshToken } from '@api/graphql';
import { OAuthRefreshTokenDto } from '@api/o-auth/refresh-token';
import { OAuthFindRefreshTokenByIdQuery } from '@app/o-auth/refresh-token';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

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
        return await this.queryBus.ask(new OAuthFindRefreshTokenByIdQuery(
            id,
            constraint,
            {
                timezone,
            },
        ));
    }
}
