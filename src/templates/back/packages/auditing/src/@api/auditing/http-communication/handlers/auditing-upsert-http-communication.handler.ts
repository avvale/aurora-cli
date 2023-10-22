import { AuditingHttpCommunicationDto, AuditingUpdateHttpCommunicationByIdDto } from '@api/auditing/http-communication';
import { AuditingHttpCommunication, AuditingUpdateHttpCommunicationByIdInput } from '@api/graphql';
import { AuditingFindHttpCommunicationByIdQuery, AuditingUpsertHttpCommunicationCommand } from '@app/auditing/http-communication';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

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
        await this.commandBus.dispatch(new AuditingUpsertHttpCommunicationCommand(
            payload,
            {
                timezone,
            },
        ));

        return await this.queryBus.ask(new AuditingFindHttpCommunicationByIdQuery(
            payload.id,
            {},
            {
                timezone,
            },
        ));
    }
}
