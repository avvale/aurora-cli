import { Injectable } from '@nestjs/common';
import { AuditingMeta, ICommandBus, IQueryBus, QueryStatement, Utils } from '@aurora-ts/core';

// @app
import { FindHttpCommunicationByIdQuery } from '@app/auditing/http-communication/application/find/find-http-communication-by-id.query';
import { UpdateHttpCommunicationByIdCommand } from '@app/auditing/http-communication/application/update/update-http-communication-by-id.command';
import { AuditingHttpCommunication, AuditingUpdateHttpCommunicationByIdInput } from '@api/graphql';
import { AuditingHttpCommunicationDto, AuditingUpdateHttpCommunicationByIdDto } from '../dto';

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
        const httpCommunication = await this.queryBus.ask(new FindHttpCommunicationByIdQuery(
            payload.id,
            constraint,
            {
                timezone,
            },
        ));

        const dataToUpdate = Utils.diff(payload, httpCommunication);

        await this.commandBus.dispatch(new UpdateHttpCommunicationByIdCommand(
            {
                ...dataToUpdate,
                id: payload.id,
            },
            constraint,
            {
                timezone,
            },
        ));

        return await this.queryBus.ask(new FindHttpCommunicationByIdQuery(
            payload.id,
            constraint,
            {
                timezone,
            },
        ));
    }
}