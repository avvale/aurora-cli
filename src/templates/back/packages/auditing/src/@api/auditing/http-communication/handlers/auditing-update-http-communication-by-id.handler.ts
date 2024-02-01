import { AuditingHttpCommunicationDto, AuditingUpdateHttpCommunicationByIdDto } from '@api/auditing/http-communication';
import { AuditingHttpCommunication, AuditingUpdateHttpCommunicationByIdInput } from '@api/graphql';
import { AuditingFindHttpCommunicationByIdQuery, AuditingUpdateHttpCommunicationByIdCommand } from '@app/auditing/http-communication';
import { ICommandBus, IQueryBus, QueryStatement, diff } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuditingUpdateHttpCommunicationByIdHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: AuditingUpdateHttpCommunicationByIdInput | AuditingUpdateHttpCommunicationByIdDto,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<AuditingHttpCommunication | AuditingHttpCommunicationDto>
    {
        const httpCommunication = await this.queryBus.ask(new AuditingFindHttpCommunicationByIdQuery(
            payload.id,
            constraint,
            {
                timezone,
            },
        ));

        const dataToUpdate = diff(payload, httpCommunication);

        await this.commandBus.dispatch(new AuditingUpdateHttpCommunicationByIdCommand(
            {
                ...dataToUpdate,
                id: payload.id,
            },
            constraint,
            {
                timezone,
            },
        ));

        return await this.queryBus.ask(new AuditingFindHttpCommunicationByIdQuery(
            payload.id,
            constraint,
            {
                timezone,
            },
        ));
    }
}
