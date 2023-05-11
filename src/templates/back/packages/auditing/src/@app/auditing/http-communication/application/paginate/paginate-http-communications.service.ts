import { Injectable } from '@nestjs/common';
import { QueryStatement } from '@aurorajs.dev/core';
import { Pagination } from '@aurorajs.dev/core';
import { CQMetadata } from '@aurorajs.dev/core';
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