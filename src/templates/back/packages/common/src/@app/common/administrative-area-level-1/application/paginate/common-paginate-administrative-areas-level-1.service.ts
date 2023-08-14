import { Injectable } from '@nestjs/common';
import { QueryStatement } from '@aurorajs.dev/core';
import { Pagination } from '@aurorajs.dev/core';
import { CQMetadata } from '@aurorajs.dev/core';
import { CommonIAdministrativeAreaLevel1Repository } from '../../domain/common-administrative-area-level-1.repository';
import { CommonAdministrativeAreaLevel1 } from '../../domain/common-administrative-area-level-1.aggregate';

@Injectable()
export class CommonPaginateAdministrativeAreasLevel1Service
{
    constructor(
        private readonly repository: CommonIAdministrativeAreaLevel1Repository,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<Pagination<CommonAdministrativeAreaLevel1>>
    {
        return await this.repository.paginate({
            queryStatement,
            constraint,
            cQMetadata,
        });
    }
}
