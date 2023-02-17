import { Injectable } from '@nestjs/common';
import { CQMetadata, QueryStatement } from '@aurora-ts/core';
import { IHttpCommunicationRepository } from '../../domain/http-communication.repository';
import { AuditingHttpCommunication } from '../../domain/http-communication.aggregate';
import { HttpCommunicationId } from '../../domain/value-objects';

@Injectable()
export class FindHttpCommunicationByIdService
{
    constructor(
        private readonly repository: IHttpCommunicationRepository,
    ) {}

    async main(
        id: HttpCommunicationId,
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