import { OAuthRefreshToken } from '@api/graphql';
import { OAuthRefreshTokenDto } from '@api/o-auth/refresh-token';
import {
    OAuthDeleteRefreshTokenByIdCommand,
    OAuthFindRefreshTokenByIdQuery,
} from '@app/o-auth/refresh-token';
import { ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OAuthDeleteRefreshTokenByIdHandler {
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        id: string,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<OAuthRefreshToken | OAuthRefreshTokenDto> {
        const refreshToken = await this.queryBus.ask(
            new OAuthFindRefreshTokenByIdQuery(id, constraint, {
                timezone,
            }),
        );

        await this.commandBus.dispatch(
            new OAuthDeleteRefreshTokenByIdCommand(id, constraint, {
                timezone,
            }),
        );

        return refreshToken;
    }
}
