import { Injectable } from '@nestjs/common';
import { QueryStatement } from '@aurorajs.dev/core';
import { CQMetadata } from '@aurorajs.dev/core';
import { IAdministrativeAreaLevel2Repository } from '../../domain/administrative-area-level-2.repository';
import { CommonAdministrativeAreaLevel2 } from '../../domain/administrative-area-level-2.aggregate';

@Injectable()
export class FindAdministrativeAreaLevel2Service
{
    constructor(
        private readonly repository: IAdministrativeAreaLevel2Repository,
    ) {}

    async main(queryStatement?: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<CommonAdministrativeAreaLevel2>
    {
        return await this.repository.find({ queryStatement, constraint, cQMetadata });
    }
}