import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';

//
import { CreateHttpCommunicationsCommand } from '@app/auditing/http-communication/application/create/create-http-communications.command';
import { httpCommunications } from '@app/auditing/http-communication/infrastructure/mock/mock-http-communication.data';

@Injectable()
export class AuditingHttpCommunicationSeeder
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(): Promise<boolean>
    {
        await this.commandBus.dispatch(new CreateHttpCommunicationsCommand(
            httpCommunications,
            {
                timezone: process.env.TZ ,
            },
        ));

        return true;
    }
}