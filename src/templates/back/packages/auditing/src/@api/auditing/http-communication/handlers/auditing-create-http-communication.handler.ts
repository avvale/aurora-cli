import { Injectable } from '@nestjs/common';
import { AuditingMeta, ICommandBus, IQueryBus } from '@aurorajs.dev/core';

// @app
import { FindHttpCommunicationByIdQuery } from '@app/auditing/http-communication/application/find/find-http-communication-by-id.query';
import { CreateHttpCommunicationCommand } from '@app/auditing/http-communication/application/create/create-http-communication.command';
import { AuditingHttpCommunication, AuditingCreateHttpCommunicationInput } from '@api/graphql';
import { AuditingHttpCommunicationDto, AuditingCreateHttpCommunicationDto } from '../dto';

@Injectable()
export class AuditingCreateHttpCommunicationHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: AuditingCreateHttpCommunicationInput | AuditingCreateHttpCommunicationDto,
        timezone?: string,
    ): Promise<AuditingHttpCommunication | AuditingHttpCommunicationDto>
    {
        await this.commandBus.dispatch(new CreateHttpCommunicationCommand(
            payload,
            {
                timezone,
            },
        ));

        return await this.queryBus.ask(new FindHttpCommunicationByIdQuery(
            payload.id,
            {},
            {
                timezone,
            },
        ));
    }
}