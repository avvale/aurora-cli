import { Injectable } from '@nestjs/common';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { CommonIAdministrativeAreaLevel2Repository } from '../../domain/common-administrative-area-level-2.repository';
import { CommonAdministrativeAreaLevel2 } from '../../domain/common-administrative-area-level-2.aggregate';
import { CommonAdministrativeAreaLevel2Id } from '../../domain/value-objects';

@Injectable()
export class CommonFindAdministrativeAreaLevel2ByIdService
{
    constructor(
        private readonly repository: CommonIAdministrativeAreaLevel2Repository,
    ) {}

    async main(
        id: CommonAdministrativeAreaLevel2Id,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<CommonAdministrativeAreaLevel2>
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
