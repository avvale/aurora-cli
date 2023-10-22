import { Injectable } from '@nestjs/common';
import { QueryStatement } from '@aurorajs.dev/core';
import { CQMetadata } from '@aurorajs.dev/core';
import { AuditingIHttpCommunicationRepository } from '../../domain/auditing-http-communication.repository';
import { AuditingHttpCommunication } from '../../domain/auditing-http-communication.aggregate';

@Injectable()
export class AuditingGetHttpCommunicationsService
{
    constructor(
        private readonly repository: AuditingIHttpCommunicationRepository,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<AuditingHttpCommunication[]>
    {
        return await this.repository.get({
            queryStatement,
            constraint,
            cQMetadata,
        });
    }
}
