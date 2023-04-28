import { Injectable } from '@nestjs/common';
import { AuditingMeta, ICommandBus, IQueryBus, QueryStatement } from '@aurora-ts/core';

// @app
import { GetHttpCommunicationsQuery } from '@app/auditing/http-communication/application/get/get-http-communications.query';
import { UpdateHttpCommunicationsCommand } from '@app/auditing/http-communication/application/update/update-http-communications.command';
import { AuditingHttpCommunication, AuditingUpdateHttpCommunicationsInput } from '@api/graphql';
import { AuditingHttpCommunicationDto, AuditingUpdateHttpCommunicationsDto } from '../dto';

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
        await this.commandBus.dispatch(new UpdateHttpCommunicationsCommand(
            payload,
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));

        return await this.queryBus.ask(new GetHttpCommunicationsQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));
    }
}