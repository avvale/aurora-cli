import { CommonAdministrativeAreaLevel1, CommonIAdministrativeAreaLevel1Repository } from '@app/common/administrative-area-level-1';
import { CommonAdministrativeAreaLevel1Id } from '@app/common/administrative-area-level-1/domain/value-objects';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonFindAdministrativeAreaLevel1ByIdService
{
    constructor(
        private readonly repository: CommonIAdministrativeAreaLevel1Repository,
    ) {}

    async main(
        id: CommonAdministrativeAreaLevel1Id,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<CommonAdministrativeAreaLevel1>
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
