import { Injectable } from '@nestjs/common';
import { IQueryBus, QueryStatement } from 'aurora-ts-core';

// @apps
import { FindClientQuery } from '@apps/o-auth/client/application/find/find-client.query';
import { OAuthClient } from '../../../../graphql';
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