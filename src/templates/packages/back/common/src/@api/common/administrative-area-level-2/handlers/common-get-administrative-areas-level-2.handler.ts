import { Injectable } from '@nestjs/common';
import { IQueryBus, QueryStatement } from 'aurora-ts-core';

// @apps
import { GetAdministrativeAreasLevel2Query } from '@apps/common/administrative-area-level-2/application/get/get-administrative-areas-level-2.query';
import { CommonAdministrativeAreaLevel2 } from '../../../../graphql';
import { CommonAdministrativeAreaLevel2Dto } from '../dto';

@Injectable()
export class CommonGetAdministrativeAreasLevel2Handler
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<CommonAdministrativeAreaLevel2[] | CommonAdministrativeAreaLevel2Dto[]>
    {
        return await this.queryBus.ask(new GetAdministrativeAreasLevel2Query(queryStatement, constraint, { timezone }));
    }
}