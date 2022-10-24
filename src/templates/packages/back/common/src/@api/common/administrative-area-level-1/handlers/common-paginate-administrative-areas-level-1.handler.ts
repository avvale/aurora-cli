import { Injectable } from '@nestjs/common';
import { IQueryBus, QueryStatement } from 'aurora-ts-core';

// @apps
import { PaginateAdministrativeAreasLevel1Query } from '@apps/common/administrative-area-level-1/application/paginate/paginate-administrative-areas-level-1.query';
import { Pagination } from 'src/graphql';

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
        return await this.queryBus.ask(new PaginateAdministrativeAreasLevel1Query(queryStatement, constraint, { timezone }));
    }
}