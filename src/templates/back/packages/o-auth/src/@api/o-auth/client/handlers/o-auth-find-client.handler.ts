import { Injectable } from '@nestjs/common';
import { IQueryBus, QueryStatement } from '@aurora-ts/core';

// @app
import { FindClientQuery } from '@app/o-auth/client/application/find/find-client.query';
import { OAuthClient } from '@api/graphql';
import { OAuthClientDto } from '../dto';

@Injectable()
export class OAuthFindClientHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<OAuthClient | OAuthClientDto>
    {
        return await this.queryBus.ask(new FindClientQuery(queryStatement, constraint, { timezone }));
    }
}