import { Pagination } from '@api/graphql';
import { CommonPaginateAdministrativeAreasLevel1Query } from '@app/common/administrative-area-level-1';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonPaginateAdministrativeAreasLevel1Handler
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
        return await this.queryBus.ask(new CommonPaginateAdministrativeAreasLevel1Query(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));
    }
}
