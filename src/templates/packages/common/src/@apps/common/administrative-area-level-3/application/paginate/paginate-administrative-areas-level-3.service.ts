import { Injectable } from '@nestjs/common';
import { QueryStatement } from 'aurora-ts-core';
import { Pagination } from 'aurora-ts-core';
import { CQMetadata } from 'aurora-ts-core';
import { IAdministrativeAreaLevel3Repository } from './../../domain/administrative-area-level-3.repository';
import { CommonAdministrativeAreaLevel3 } from './../../domain/administrative-area-level-3.aggregate';

@Injectable()
export class PaginateAdministrativeAreasLevel3Service
{
    constructor(
        private readonly repository: IAdministrativeAreaLevel3Repository,
    ) {}

    public async main(queryStatement?: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<Pagination<CommonAdministrativeAreaLevel3>>
    {
        return await this.repository.paginate({ queryStatement, constraint, cQMetadata });
    }
}