import { Injectable } from '@nestjs/common';
import { QueryStatement } from '@aurorajs.dev/core';
import { Pagination } from '@aurorajs.dev/core';
import { CQMetadata } from '@aurorajs.dev/core';
import { IClientRepository } from '../../domain/client.repository';
import { OAuthClient } from '../../domain/client.aggregate';

@Injectable()
export class PaginateClientsService
{
    constructor(
        private readonly repository: IClientRepository,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<Pagination<OAuthClient>>
    {
        return await this.repository.paginate({
            queryStatement,
            constraint,
            cQMetadata,
        });
    }
}