import { Injectable } from '@nestjs/common';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { IAdministrativeAreaLevel1Repository } from '../../domain/administrative-area-level-1.repository';
import { CommonAdministrativeAreaLevel1 } from '../../domain/administrative-area-level-1.aggregate';
import { AdministrativeAreaLevel1Id } from '../../domain/value-objects';

@Injectable()
export class FindAdministrativeAreaLevel1ByIdService
{
    constructor(
        private readonly repository: IAdministrativeAreaLevel1Repository,
    ) {}

    async main(id: AdministrativeAreaLevel1Id, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<CommonAdministrativeAreaLevel1>
    {
        return await this.repository.findById(id, { constraint, cQMetadata });
    }
}