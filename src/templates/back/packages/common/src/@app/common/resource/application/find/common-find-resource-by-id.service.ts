import { CommonIResourceRepository, CommonResource } from '@app/common/resource';
import { CommonResourceId } from '@app/common/resource/domain/value-objects';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

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
