import { OAuthApplication } from '@api/graphql';
import { OAuthApplicationDto } from '@api/o-auth/application';
import {
    OAuthDeleteApplicationsCommand,
    OAuthGetApplicationsQuery,
} from '@app/o-auth/application';
import {
    AuditingMeta,
    ICommandBus,
    IQueryBus,
    QueryStatement,
} from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OAuthDeleteApplicationsHandler {
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<OAuthApplication[] | OAuthApplicationDto[]> {
        const applications = await this.queryBus.ask(
            new OAuthGetApplicationsQuery(queryStatement, constraint, {
                timezone,
            }),
        );

        await this.commandBus.dispatch(
            new OAuthDeleteApplicationsCommand(queryStatement, constraint, {
                timezone,
                repositoryOptions: {
                    auditing,
                },
            }),
        );

        return applications;
    }
}
