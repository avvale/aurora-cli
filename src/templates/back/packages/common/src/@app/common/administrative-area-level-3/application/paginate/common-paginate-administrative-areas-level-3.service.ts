import { Injectable } from '@nestjs/common';
import { QueryStatement } from '@aurorajs.dev/core';
import { Pagination } from '@aurorajs.dev/core';
import { CQMetadata } from '@aurorajs.dev/core';
import { CommonIAdministrativeAreaLevel3Repository } from '../../domain/common-administrative-area-level-3.repository';
import { CommonAdministrativeAreaLevel3 } from '../../domain/common-administrative-area-level-3.aggregate';

@Injectable()
export class CommonPaginateAdministrativeAreasLevel3Service
{
    constructor(
        private readonly repository: CommonIAdministrativeAreaLevel3Repository,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<Pagination<CommonAdministrativeAreaLevel3>>
    {
        return await this.repository.paginate({
            queryStatement,
            constraint,
            cQMetadata,
        });
    }
}