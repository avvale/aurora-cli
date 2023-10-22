import { Injectable } from '@nestjs/common';
import { CQMetadata } from '@aurorajs.dev/core';
import { AuditingIHttpCommunicationRepository } from '../../domain/auditing-http-communication.repository';
import { AuditingHttpCommunication } from '../../domain/auditing-http-communication.aggregate';

@Injectable()
export class AuditingRawSQLHttpCommunicationsService
{
    constructor(
        private readonly repository: AuditingIHttpCommunicationRepository,
    ) {}

    async main(
        rawSQL?: string,
        cQMetadata?: CQMetadata,
    ): Promise<AuditingHttpCommunication[]>
    {
        return await this.repository.rawSQL({
            rawSQL,
            cQMetadata,
        });
    }
}
