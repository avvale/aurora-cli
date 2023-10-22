import { AuditingHttpCommunicationDto } from '@api/auditing/http-communication';
import { AuditingHttpCommunication } from '@api/graphql';
import { AuditingFindHttpCommunicationByIdQuery } from '@app/auditing/http-communication';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuditingFindHttpCommunicationByIdHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        id: string,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<AuditingHttpCommunication | AuditingHttpCommunicationDto>
    {
        return await this.queryBus.ask(new AuditingFindHttpCommunicationByIdQuery(
            id,
            constraint,
            {
                timezone,
            },
        ));
    }
}
