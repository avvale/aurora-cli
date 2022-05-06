import { Resolver, Args, Query } from '@nestjs/graphql';
import { Constraint, IQueryBus, QueryStatement, Timezone } from 'aurora-ts-core';

// @apps
import { PaginateAdministrativeAreasLevel2Query } from '../../../../@apps/common/administrative-area-level-2/application/paginate/paginate-administrative-areas-level-2.query';
import { Pagination } from './../../../../graphql';

@Resolver()
export class CommonPaginateAdministrativeAreasLevel2Resolver
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    @Query('commonPaginateAdministrativeAreasLevel2')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<Pagination>
    {
        return await this.queryBus.ask(new PaginateAdministrativeAreasLevel2Query(queryStatement, constraint, { timezone }));
    }
}