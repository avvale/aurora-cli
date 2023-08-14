import { Injectable } from '@nestjs/common';
import { QueryStatement } from '@aurorajs.dev/core';
import { Pagination } from '@aurorajs.dev/core';
import { CQMetadata } from '@aurorajs.dev/core';
import { CommonIResourceRepository } from '../../domain/common-resource.repository';
import { CommonResource } from '../../domain/common-resource.aggregate';

@Injectable()
export class CommonPaginateResourcesService
{
    constructor(
        private readonly repository: CommonIResourceRepository,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<Pagination<CommonResource>>
    {
        return await this.repository.paginate({
            queryStatement,
            constraint,
            cQMetadata,
        });
    }
}
