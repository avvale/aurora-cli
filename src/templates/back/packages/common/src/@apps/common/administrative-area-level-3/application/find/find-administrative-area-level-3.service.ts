import { Injectable } from '@nestjs/common';
import { QueryStatement } from '@aurorajs.dev/core';
import { CQMetadata } from '@aurorajs.dev/core';
import { IAdministrativeAreaLevel3Repository } from '../../domain/administrative-area-level-3.repository';
import { CommonAdministrativeAreaLevel3 } from '../../domain/administrative-area-level-3.aggregate';

@Injectable()
export class FindAdministrativeAreaLevel3Service
{
    constructor(
        private readonly repository: IAdministrativeAreaLevel3Repository,
    ) {}

    async main(queryStatement?: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<CommonAdministrativeAreaLevel3>
    {
        return await this.repository.find({ queryStatement, constraint, cQMetadata });
    }
}