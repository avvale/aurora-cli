import { Injectable } from '@nestjs/common';
import { IQueryBus, QueryStatement } from 'aurora-ts-core';

// @apps
import { PaginateAdministrativeAreasLevel3Query } from '@apps/common/administrative-area-level-3/application/paginate/paginate-administrative-areas-level-3.query';
import { Pagination } from '../../../../graphql';

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
        return await this.queryBus.ask(new PaginateAdministrativeAreasLevel3Query(queryStatement, constraint, { timezone }));
    }
}