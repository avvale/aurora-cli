import { AuditingHttpCommunicationDto } from '@api/auditing/http-communication';
import { AuditingHttpCommunication } from '@api/graphql';
import { AuditingFindHttpCommunicationQuery } from '@app/auditing/http-communication';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuditingFindHttpCommunicationHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<AuditingHttpCommunication | AuditingHttpCommunicationDto>
    {
        return await this.queryBus.ask(new AuditingFindHttpCommunicationQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));
    }
}
