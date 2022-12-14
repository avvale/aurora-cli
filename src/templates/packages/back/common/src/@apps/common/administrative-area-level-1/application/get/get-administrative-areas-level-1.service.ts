import { Injectable } from '@nestjs/common';
import { QueryStatement } from '@aurora-ts/core';
import { CQMetadata } from '@aurora-ts/core';
import { IAdministrativeAreaLevel1Repository } from '../../domain/administrative-area-level-1.repository';
import { CommonAdministrativeAreaLevel1 } from '../../domain/administrative-area-level-1.aggregate';

@Injectable()
export class GetAdministrativeAreasLevel1Service
{
    constructor(
        private readonly repository: IAdministrativeAreaLevel1Repository,
    ) {}

    async main(queryStatement?: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<CommonAdministrativeAreaLevel1[]>
    {
        return await this.repository.get({ queryStatement, constraint, cQMetadata });
    }
}