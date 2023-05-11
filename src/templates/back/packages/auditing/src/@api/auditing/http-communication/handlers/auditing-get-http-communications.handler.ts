import { Injectable } from '@nestjs/common';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';

// @app
import { GetHttpCommunicationsQuery } from '@app/auditing/http-communication/application/get/get-http-communications.query';
import { AuditingHttpCommunication } from '@api/graphql';
import { AuditingHttpCommunicationDto } from '../dto';

@Injectable()
export class AuditingGetHttpCommunicationsHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<AuditingHttpCommunication[] | AuditingHttpCommunicationDto[]>
    {
        return await this.queryBus.ask(new GetHttpCommunicationsQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));
    }
}