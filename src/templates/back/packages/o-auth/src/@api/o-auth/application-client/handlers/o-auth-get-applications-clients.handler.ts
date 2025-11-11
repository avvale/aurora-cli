import { OAuthApplicationClient } from '@api/graphql';
import { OAuthApplicationClientDto } from '@api/o-auth/application-client';
import { OAuthGetApplicationsClientsQuery } from '@app/o-auth/application-client';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OAuthGetApplicationsClientsHandler {
    constructor(private readonly queryBus: IQueryBus) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<OAuthApplicationClient[] | OAuthApplicationClientDto[]> {
        return await this.queryBus.ask(
            new OAuthGetApplicationsClientsQuery(queryStatement, constraint, {
                timezone,
            }),
        );
    }
}
