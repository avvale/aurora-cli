import { Injectable } from '@nestjs/common';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';

// @app
import { GetAdministrativeAreasLevel2Query } from '@app/common/administrative-area-level-2/application/get/get-administrative-areas-level-2.query';
import { CommonAdministrativeAreaLevel2 } from '@api/graphql';
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