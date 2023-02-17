import { Injectable } from '@nestjs/common';
import { QueryStatement } from '@aurora-ts/core';
import { Pagination } from '@aurora-ts/core';
import { CQMetadata } from '@aurora-ts/core';
import { IHttpCommunicationRepository } from '../../domain/http-communication.repository';
import { AuditingHttpCommunication } from '../../domain/http-communication.aggregate';

@Injectable()
export class PaginateHttpCommunicationsService
{
    constructor(
        private readonly repository: IHttpCommunicationRepository,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<Pagination<AuditingHttpCommunication>>
    {
        return await this.repository.paginate({
            queryStatement,
            constraint,
            cQMetadata,
        });
    }
}