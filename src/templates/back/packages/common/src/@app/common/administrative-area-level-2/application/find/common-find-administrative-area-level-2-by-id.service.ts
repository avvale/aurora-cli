import { CommonAdministrativeAreaLevel2, CommonIAdministrativeAreaLevel2Repository } from '@app/common/administrative-area-level-2';
import { CommonAdministrativeAreaLevel2Id } from '@app/common/administrative-area-level-2/domain/value-objects';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

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
