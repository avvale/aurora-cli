import { AuditingHttpCommunicationDto } from '@api/auditing/http-communication';
import { AuditingHttpCommunication } from '@api/graphql';
import { AuditingDeleteHttpCommunicationByIdCommand, AuditingFindHttpCommunicationByIdQuery } from '@app/auditing/http-communication';
import { ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuditingDeleteHttpCommunicationByIdHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        id: string,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<AuditingHttpCommunication | AuditingHttpCommunicationDto>
    {
        const httpCommunication = await this.queryBus.ask(new AuditingFindHttpCommunicationByIdQuery(
            id,
            constraint,
            {
                timezone,
            },
        ));

        await this.commandBus.dispatch(new AuditingDeleteHttpCommunicationByIdCommand(
            id,
            constraint,
            {
                timezone,
            },
        ));

        return httpCommunication;
    }
}
