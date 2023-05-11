import { Injectable } from '@nestjs/common';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';

// @app
import { GetAdministrativeAreasLevel3Query } from '@app/common/administrative-area-level-3/application/get/get-administrative-areas-level-3.query';
import { CommonAdministrativeAreaLevel3 } from '@api/graphql';
import { CommonAdministrativeAreaLevel3Dto } from '../dto';

@Injectable()
export class CommonGetAdministrativeAreasLevel3Handler
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<CommonAdministrativeAreaLevel3[] | CommonAdministrativeAreaLevel3Dto[]>
    {
        return await this.queryBus.ask(new GetAdministrativeAreasLevel3Query(queryStatement, constraint, { timezone }));
    }
}