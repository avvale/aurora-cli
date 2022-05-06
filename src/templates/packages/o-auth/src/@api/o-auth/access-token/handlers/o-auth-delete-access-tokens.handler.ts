import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus, QueryStatement } from 'aurora-ts-core';

// @apps
import { GetAccessTokensQuery } from '@apps/o-auth/access-token/application/get/get-access-tokens.query';
import { DeleteAccessTokensCommand } from '@apps/o-auth/access-token/application/delete/delete-access-tokens.command';
import { OAuthAccessToken } from '../../../../graphql';
import { OAuthAccessTokenDto } from '../dto';

@Injectable()
export class OAuthDeleteAccessTokensHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<OAuthAccessToken[] | OAuthAccessTokenDto[]>
    {
        const accessTokens = await this.queryBus.ask(new GetAccessTokensQuery(queryStatement, constraint, { timezone }));

        await this.commandBus.dispatch(new DeleteAccessTokensCommand(queryStatement, constraint, { timezone }));

        return accessTokens;
    }
}