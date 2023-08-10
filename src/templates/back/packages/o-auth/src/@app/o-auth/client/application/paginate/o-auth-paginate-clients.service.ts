import { Injectable } from '@nestjs/common';
import { QueryStatement } from '@aurorajs.dev/core';
import { Pagination } from '@aurorajs.dev/core';
import { CQMetadata } from '@aurorajs.dev/core';
import { OAuthIClientRepository } from '../../domain/o-auth-client.repository';
import { OAuthClient } from '../../domain/o-auth-client.aggregate';

@Injectable()
export class OAuthPaginateClientsService
{
    constructor(
        private readonly repository: OAuthIClientRepository,
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
