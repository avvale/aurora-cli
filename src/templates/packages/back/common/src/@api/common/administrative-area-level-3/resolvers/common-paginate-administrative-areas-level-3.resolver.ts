import { Resolver, Args, Query } from '@nestjs/graphql';
import { Constraint, IQueryBus, QueryStatement, Timezone } from 'aurora-ts-core';

// @apps
import { PaginateAdministrativeAreasLevel3Query } from '../../../../@apps/common/administrative-area-level-3/application/paginate/paginate-administrative-areas-level-3.query';
import { Pagination } from './../../../../graphql';

@Resolver()
export class CommonPaginateAdministrativeAreasLevel3Resolver
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    @Query('commonPaginateAdministrativeAreasLevel3')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<Pagination>
    {
        return await this.queryBus.ask(new PaginateAdministrativeAreasLevel3Query(queryStatement, constraint, { timezone }));
    }
}