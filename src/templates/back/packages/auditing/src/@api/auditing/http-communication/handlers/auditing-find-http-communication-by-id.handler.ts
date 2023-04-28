import { Injectable } from '@nestjs/common';
import { IQueryBus, QueryStatement } from '@aurora-ts/core';

// @app
import { FindHttpCommunicationByIdQuery } from '@app/auditing/http-communication/application/find/find-http-communication-by-id.query';
import { AuditingHttpCommunication } from '@api/graphql';
import { AuditingHttpCommunicationDto } from '../dto';

@Injectable()
export class AuditingFindHttpCommunicationByIdHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        id: string,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<AuditingHttpCommunication | AuditingHttpCommunicationDto>
    {
        return await this.queryBus.ask(new FindHttpCommunicationByIdQuery(
            id,
            constraint,
            {
                timezone,
            },
        ));
    }
}