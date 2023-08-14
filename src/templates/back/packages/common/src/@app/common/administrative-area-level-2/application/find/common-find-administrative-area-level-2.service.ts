import { CommonAdministrativeAreaLevel2, CommonIAdministrativeAreaLevel2Repository } from '@app/common/administrative-area-level-2';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonFindAdministrativeAreaLevel2Service
{
    constructor(
        private readonly repository: CommonIAdministrativeAreaLevel2Repository,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<CommonAdministrativeAreaLevel2>
    {
        return await this.repository.find(
            {
                queryStatement,
                constraint,
                cQMetadata,
            },
        );
    }
}
