import { Injectable } from '@nestjs/common';
import { CQMetadata } from '@aurorajs.dev/core';
import { CommonIAdministrativeAreaLevel1Repository } from '../../domain/common-administrative-area-level-1.repository';
import { CommonAdministrativeAreaLevel1 } from '../../domain/common-administrative-area-level-1.aggregate';

@Injectable()
export class CommonRawSQLAdministrativeAreasLevel1Service
{
    constructor(
        private readonly repository: CommonIAdministrativeAreaLevel1Repository,
    ) {}

    async main(
        rawSQL?: string,
        cQMetadata?: CQMetadata,
    ): Promise<CommonAdministrativeAreaLevel1[]>
    {
        return await this.repository.rawSQL({
            rawSQL,
            cQMetadata,
        });
    }
}
