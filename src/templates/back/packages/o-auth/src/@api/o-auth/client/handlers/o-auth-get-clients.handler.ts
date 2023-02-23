import { Injectable } from '@nestjs/common';
import { IQueryBus, QueryStatement } from '@aurora-ts/core';

// @app
import { GetClientsQuery } from '@app/o-auth/client/application/get/get-clients.query';
import { OAuthClient } from '@api/graphql';
import { OAuthClientDto } from '../dto';

@Injectable()
export class OAuthGetClientsHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<OAuthClient[] | OAuthClientDto[]>
    {
        return await this.queryBus.ask(new GetClientsQuery(queryStatement, constraint, { timezone }));
    }
}