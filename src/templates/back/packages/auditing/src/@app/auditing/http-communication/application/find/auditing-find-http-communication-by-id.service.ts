import { Injectable } from '@nestjs/common';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { AuditingIHttpCommunicationRepository } from '../../domain/auditing-http-communication.repository';
import { AuditingHttpCommunication } from '../../domain/auditing-http-communication.aggregate';
import { AuditingHttpCommunicationId } from '../../domain/value-objects';

@Injectable()
export class AuditingFindHttpCommunicationByIdService
{
    constructor(
        private readonly repository: AuditingIHttpCommunicationRepository,
    ) {}

    async main(
        id: AuditingHttpCommunicationId,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<AuditingHttpCommunication>
    {
        return await this.repository.findById(
            id,
            {
                constraint,
                cQMetadata,
            },
        );
    }
}
