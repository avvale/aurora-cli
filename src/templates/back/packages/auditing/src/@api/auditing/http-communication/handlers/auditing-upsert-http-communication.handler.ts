import { Injectable } from '@nestjs/common';
import { AuditingMeta, ICommandBus, IQueryBus } from '@aurora-ts/core';

// @app
import { FindHttpCommunicationByIdQuery } from '@app/auditing/http-communication/application/find/find-http-communication-by-id.query';
import { UpsertHttpCommunicationCommand } from '@app/auditing/http-communication/application/upsert/upsert-http-communication.command';
import { AuditingHttpCommunication, AuditingUpdateHttpCommunicationByIdInput } from '@api/graphql';
import { AuditingHttpCommunicationDto, AuditingUpdateHttpCommunicationByIdDto } from '../dto';

@Injectable()
export class AuditingUpsertHttpCommunicationHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: AuditingUpdateHttpCommunicationByIdInput | AuditingUpdateHttpCommunicationByIdDto,
        timezone?: string,
    ): Promise<AuditingHttpCommunication | AuditingHttpCommunicationDto>
    {
        await this.commandBus.dispatch(new UpsertHttpCommunicationCommand(
            payload,
            {
                timezone,
            },
        ));

        return await this.queryBus.ask(new FindHttpCommunicationByIdQuery(
            payload.id,
            {},
            { timezone },
        ));
    }
}