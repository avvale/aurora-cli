import { Injectable } from '@nestjs/common';
import { AuditingMeta, ICommandBus } from '@aurora-ts/core';

// @app
import { CreateHttpCommunicationsCommand } from '@app/auditing/http-communication/application/create/create-http-communications.command';
import { AuditingCreateHttpCommunicationInput } from '@api/graphql';
import { AuditingCreateHttpCommunicationDto } from '../dto';

@Injectable()
export class AuditingCreateHttpCommunicationsHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    async main(
        payload: AuditingCreateHttpCommunicationInput[] | AuditingCreateHttpCommunicationDto[],
        timezone?: string,
    ): Promise<boolean>
    {
        await this.commandBus.dispatch(new CreateHttpCommunicationsCommand(
            payload,
            {
                timezone,
            },
        ));
        return true;
    }
}