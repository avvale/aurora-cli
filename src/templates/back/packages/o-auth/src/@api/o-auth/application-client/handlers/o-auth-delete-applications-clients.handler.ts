import { OAuthApplicationClient } from '@api/graphql';
import { OAuthApplicationClientDto } from '@api/o-auth/application-client';
import {
    OAuthDeleteApplicationsClientsCommand,
    OAuthGetApplicationsClientsQuery,
} from '@app/o-auth/application-client';
import {
    AuditingMeta,
    ICommandBus,
    IQueryBus,
    QueryStatement,
} from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OAuthDeleteApplicationsClientsHandler {
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<OAuthApplicationClient[] | OAuthApplicationClientDto[]> {
        const applicationsClients = await this.queryBus.ask(
            new OAuthGetApplicationsClientsQuery(queryStatement, constraint, {
                timezone,
            }),
        );

        await this.commandBus.dispatch(
            new OAuthDeleteApplicationsClientsCommand(
                queryStatement,
                constraint,
                {
                    timezone,
                    repositoryOptions: {
                        auditing,
                    },
                },
            ),
        );

        return applicationsClients;
    }
}
