import { Pagination } from '@api/graphql';
import { CommonPaginateAdministrativeAreasLevel3Query } from '@app/common/administrative-area-level-3';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonPaginateAdministrativeAreasLevel3Handler
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<Pagination>
    {
        return await this.queryBus.ask(new CommonPaginateAdministrativeAreasLevel3Query(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));
    }
}