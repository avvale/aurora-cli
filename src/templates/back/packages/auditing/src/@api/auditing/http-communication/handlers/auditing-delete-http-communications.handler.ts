import { Injectable } from '@nestjs/common';
import { AuditingMeta, ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';

// @app
import { GetHttpCommunicationsQuery } from '@app/auditing/http-communication/application/get/get-http-communications.query';
import { DeleteHttpCommunicationsCommand } from '@app/auditing/http-communication/application/delete/delete-http-communications.command';
import { AuditingHttpCommunication } from '@api/graphql';
import { AuditingHttpCommunicationDto } from '../dto';

@Injectable()
export class AuditingDeleteHttpCommunicationsHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<AuditingHttpCommunication[] | AuditingHttpCommunicationDto[]>
    {
        const httpCommunications = await this.queryBus.ask(new GetHttpCommunicationsQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));

        await this.commandBus.dispatch(new DeleteHttpCommunicationsCommand(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));

        return httpCommunications;
    }
}