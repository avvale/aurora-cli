import { CommonAdministrativeAreaLevel3, CommonIAdministrativeAreaLevel3Repository } from '@app/common/administrative-area-level-3';
import { CQMetadata } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonRawSQLAdministrativeAreasLevel3Service
{
    constructor(
        private readonly repository: CommonIAdministrativeAreaLevel3Repository,
    ) {}

    async main(
        rawSQL?: string,
        cQMetadata?: CQMetadata,
    ): Promise<CommonAdministrativeAreaLevel3[]>
    {
        return await this.repository.rawSQL({
            rawSQL,
            cQMetadata,
        });
    }
}
