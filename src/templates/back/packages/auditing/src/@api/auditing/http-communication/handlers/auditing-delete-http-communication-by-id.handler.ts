import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus, QueryStatement } from '@aurora-ts/core';

// @app
import { FindHttpCommunicationByIdQuery } from '@app/auditing/http-communication/application/find/find-http-communication-by-id.query';
import { DeleteHttpCommunicationByIdCommand } from '@app/auditing/http-communication/application/delete/delete-http-communication-by-id.command';
import { AuditingHttpCommunication } from '@api/graphql';
import { AuditingHttpCommunicationDto } from '../dto';

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
        const httpCommunication = await this.queryBus.ask(new FindHttpCommunicationByIdQuery(id, constraint, { timezone }));

        await this.commandBus.dispatch(new DeleteHttpCommunicationByIdCommand(
            id,
            constraint,
            {
                timezone,
            },
        ));

        return httpCommunication;
    }
}