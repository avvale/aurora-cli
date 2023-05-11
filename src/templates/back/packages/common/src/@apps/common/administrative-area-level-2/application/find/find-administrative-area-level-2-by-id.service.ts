import { Injectable } from '@nestjs/common';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { IAdministrativeAreaLevel2Repository } from '../../domain/administrative-area-level-2.repository';
import { CommonAdministrativeAreaLevel2 } from '../../domain/administrative-area-level-2.aggregate';
import { AdministrativeAreaLevel2Id } from '../../domain/value-objects';

@Injectable()
export class FindAdministrativeAreaLevel2ByIdService
{
    constructor(
        private readonly repository: IAdministrativeAreaLevel2Repository,
    ) {}

    async main(id: AdministrativeAreaLevel2Id, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<CommonAdministrativeAreaLevel2>
    {
        return await this.repository.findById(id, { constraint, cQMetadata });
    }
}