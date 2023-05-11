import { Injectable } from '@nestjs/common';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';

// @app
import { FindHttpCommunicationQuery } from '@app/auditing/http-communication/application/find/find-http-communication.query';
import { AuditingHttpCommunication } from '@api/graphql';
import { AuditingHttpCommunicationDto } from '../dto';

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
        return await this.queryBus.ask(new FindHttpCommunicationQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));
    }
}