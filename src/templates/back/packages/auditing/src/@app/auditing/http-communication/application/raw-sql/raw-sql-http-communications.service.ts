import { Injectable } from '@nestjs/common';
import { CQMetadata } from '@aurora-ts/core';
import { IHttpCommunicationRepository } from '../../domain/http-communication.repository';
import { AuditingHttpCommunication } from '../../domain/http-communication.aggregate';

@Injectable()
export class RawSQLHttpCommunicationsService
{
    constructor(
        private readonly repository: IHttpCommunicationRepository,
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