import { OAuthClient } from '@api/graphql';
import { OAuthClientDto } from '@api/o-auth/client';
import { OAuthGetClientsQuery } from '@app/o-auth/client';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OAuthGetClientsHandler {
    constructor(private readonly queryBus: IQueryBus) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<OAuthClient[] | OAuthClientDto[]> {
        return await this.queryBus.ask(
            new OAuthGetClientsQuery(queryStatement, constraint, {
                timezone,
            }),
        );
    }
}
