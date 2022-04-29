import { Injectable } from '@nestjs/common';
import { QueryStatement } from 'aurora-ts-core';
import { CQMetadata } from 'aurora-ts-core';
import { IAdministrativeAreaLevel3Repository } from './../../domain/administrative-area-level-3.repository';
import { CommonAdministrativeAreaLevel3 } from './../../domain/administrative-area-level-3.aggregate';
import { AdministrativeAreaLevel3Id } from './../../domain/value-objects';

@Injectable()
export class FindAdministrativeAreaLevel3ByIdService
{
    constructor(
        private readonly repository: IAdministrativeAreaLevel3Repository,
    ) {}

    public async main(id: AdministrativeAreaLevel3Id, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<CommonAdministrativeAreaLevel3>
    {
        return await this.repository.findById(id, { constraint, cQMetadata });
    }
}