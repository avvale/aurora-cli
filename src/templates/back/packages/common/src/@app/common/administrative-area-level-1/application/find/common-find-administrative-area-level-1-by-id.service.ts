import { Injectable } from '@nestjs/common';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { CommonIAdministrativeAreaLevel1Repository } from '../../domain/common-administrative-area-level-1.repository';
import { CommonAdministrativeAreaLevel1 } from '../../domain/common-administrative-area-level-1.aggregate';
import { CommonAdministrativeAreaLevel1Id } from '../../domain/value-objects';

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
