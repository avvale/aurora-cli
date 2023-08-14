import { Injectable } from '@nestjs/common';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { CommonIResourceRepository } from '../../domain/common-resource.repository';
import { CommonResource } from '../../domain/common-resource.aggregate';
import { CommonResourceId } from '../../domain/value-objects';

@Injectable()
export class CommonFindResourceByIdService
{
    constructor(
        private readonly repository: CommonIResourceRepository,
    ) {}

    async main(
        id: CommonResourceId,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<CommonResource>
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
