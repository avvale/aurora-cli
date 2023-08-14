import { Injectable } from '@nestjs/common';
import { CQMetadata } from '@aurorajs.dev/core';
import { CommonIAdministrativeAreaLevel3Repository } from '../../domain/common-administrative-area-level-3.repository';
import { CommonAdministrativeAreaLevel3 } from '../../domain/common-administrative-area-level-3.aggregate';

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
