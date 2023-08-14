import { Injectable } from '@nestjs/common';
import { CQMetadata } from '@aurorajs.dev/core';
import { CommonIResourceRepository } from '../../domain/common-resource.repository';
import { CommonResource } from '../../domain/common-resource.aggregate';

@Injectable()
export class CommonRawSQLResourcesService
{
    constructor(
        private readonly repository: CommonIResourceRepository,
    ) {}

    async main(
        rawSQL?: string,
        cQMetadata?: CQMetadata,
    ): Promise<CommonResource[]>
    {
        return await this.repository.rawSQL({
            rawSQL,
            cQMetadata,
        });
    }
}
