import { AuditingCreateHttpCommunicationDto } from '@api/auditing/http-communication';
import { AuditingCreateHttpCommunicationInput } from '@api/graphql';
import { AuditingCreateHttpCommunicationsCommand } from '@app/auditing/http-communication';
import { ICommandBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuditingCreateHttpCommunicationsHandler {
    constructor(private readonly commandBus: ICommandBus) {}

    async main(
        payload:
            | AuditingCreateHttpCommunicationInput[]
            | AuditingCreateHttpCommunicationDto[],
        timezone?: string,
    ): Promise<boolean> {
        await this.commandBus.dispatch(
            new AuditingCreateHttpCommunicationsCommand(payload, {
                timezone,
            }),
        );

        return true;
    }
}
