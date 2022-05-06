import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus, QueryStatement } from 'aurora-ts-core';

// @apps
import { GetRefreshTokensQuery } from '../../../../@apps/o-auth/refresh-token/application/get/get-refresh-tokens.query';
import { DeleteRefreshTokensCommand } from '../../../../@apps/o-auth/refresh-token/application/delete/delete-refresh-tokens.command';
import { OAuthRefreshToken } from '../../../../../graphql';
import { OAuthRefreshTokenDto } from '../dto';

@Injectable()
export class OAuthDeleteRefreshTokensHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<OAuthRefreshToken[] | OAuthRefreshTokenDto[]>
    {
        const refreshTokens = await this.queryBus.ask(new GetRefreshTokensQuery(queryStatement, constraint, { timezone }));

        await this.commandBus.dispatch(new DeleteRefreshTokensCommand(queryStatement, constraint, { timezone }));

        return refreshTokens;
    }
}