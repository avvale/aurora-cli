import { Injectable } from '@nestjs/common';
import { QueryStatement } from '@aurorajs.dev/core';
import { CQMetadata } from '@aurorajs.dev/core';
import { CommonIResourceRepository } from '../../domain/common-resource.repository';
import { CommonResource } from '../../domain/common-resource.aggregate';

@Injectable()
export class CommonGetResourcesService
{
    constructor(
        private readonly repository: CommonIResourceRepository,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<CommonResource[]>
    {
        return await this.repository.get({
            queryStatement,
            constraint,
            cQMetadata,
        });
    }
}
