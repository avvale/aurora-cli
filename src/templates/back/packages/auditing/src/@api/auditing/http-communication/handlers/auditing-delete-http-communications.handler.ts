import { AuditingHttpCommunicationDto } from '@api/auditing/http-communication';
import { AuditingHttpCommunication } from '@api/graphql';
import {
    AuditingDeleteHttpCommunicationsCommand,
    AuditingGetHttpCommunicationsQuery,
} from '@app/auditing/http-communication';
import { ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuditingDeleteHttpCommunicationsHandler {
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<AuditingHttpCommunication[] | AuditingHttpCommunicationDto[]> {
        const httpCommunications = await this.queryBus.ask(
            new AuditingGetHttpCommunicationsQuery(queryStatement, constraint, {
                timezone,
            }),
        );

        await this.commandBus.dispatch(
            new AuditingDeleteHttpCommunicationsCommand(
                queryStatement,
                constraint,
                {
                    timezone,
                },
            ),
        );

        return httpCommunications;
    }
}
