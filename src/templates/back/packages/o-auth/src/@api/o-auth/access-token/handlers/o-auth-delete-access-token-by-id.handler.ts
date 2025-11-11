import { OAuthAccessToken } from '@api/graphql';
import { OAuthAccessTokenDto } from '@api/o-auth/access-token';
import {
    OAuthDeleteAccessTokenByIdCommand,
    OAuthFindAccessTokenByIdQuery,
} from '@app/o-auth/access-token';
import { ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OAuthDeleteAccessTokenByIdHandler {
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        id: string,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<OAuthAccessToken | OAuthAccessTokenDto> {
        const accessToken = await this.queryBus.ask(
            new OAuthFindAccessTokenByIdQuery(id, constraint, {
                timezone,
            }),
        );

        await this.commandBus.dispatch(
            new OAuthDeleteAccessTokenByIdCommand(id, constraint, {
                timezone,
            }),
        );

        return accessToken;
    }
}
