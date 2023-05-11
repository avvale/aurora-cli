import { Injectable } from '@nestjs/common';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';

// @app
import { PaginateAdministrativeAreasLevel2Query } from '@app/common/administrative-area-level-2/application/paginate/paginate-administrative-areas-level-2.query';
import { Pagination } from '@api/graphql';

@Injectable()
export class CommonPaginateAdministrativeAreasLevel2Handler
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
        return await this.queryBus.ask(new PaginateAdministrativeAreasLevel2Query(queryStatement, constraint, { timezone }));
    }
}