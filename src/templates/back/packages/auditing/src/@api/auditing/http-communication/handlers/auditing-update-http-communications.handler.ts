import { AuditingHttpCommunicationDto, AuditingUpdateHttpCommunicationsDto } from '@api/auditing/http-communication';
import { AuditingHttpCommunication, AuditingUpdateHttpCommunicationsInput } from '@api/graphql';
import { AuditingGetHttpCommunicationsQuery, AuditingUpdateHttpCommunicationsCommand } from '@app/auditing/http-communication';
import { ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuditingUpdateHttpCommunicationsHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: AuditingUpdateHttpCommunicationsInput | AuditingUpdateHttpCommunicationsDto,
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<AuditingHttpCommunication | AuditingHttpCommunicationDto>
    {
        await this.commandBus.dispatch(new AuditingUpdateHttpCommunicationsCommand(
            payload,
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));

        return await this.queryBus.ask(new AuditingGetHttpCommunicationsQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));
    }
}
