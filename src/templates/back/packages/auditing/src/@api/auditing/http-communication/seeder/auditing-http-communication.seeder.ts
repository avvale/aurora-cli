import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';

//
import { AuditingCreateHttpCommunicationsCommand } from '@app/auditing/http-communication';
import { auditingMockHttpCommunicationData } from '@app/auditing/http-communication';

@Injectable()
export class AuditingHttpCommunicationSeeder
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(): Promise<boolean>
    {
        await this.commandBus.dispatch(new AuditingCreateHttpCommunicationsCommand(
            auditingMockHttpCommunicationData,
            {
                timezone: process.env.TZ ,
            },
        ));

        return true;
    }
}
