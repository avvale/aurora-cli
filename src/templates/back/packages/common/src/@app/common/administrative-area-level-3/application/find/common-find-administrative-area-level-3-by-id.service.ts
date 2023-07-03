import { Injectable } from '@nestjs/common';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { CommonIAdministrativeAreaLevel3Repository } from '../../domain/common-administrative-area-level-3.repository';
import { CommonAdministrativeAreaLevel3 } from '../../domain/common-administrative-area-level-3.aggregate';
import { CommonAdministrativeAreaLevel3Id } from '../../domain/value-objects';

@Injectable()
export class CommonFindAdministrativeAreaLevel3ByIdService
{
    constructor(
        private readonly repository: CommonIAdministrativeAreaLevel3Repository,
    ) {}

    async main(
        id: CommonAdministrativeAreaLevel3Id,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<CommonAdministrativeAreaLevel3>
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