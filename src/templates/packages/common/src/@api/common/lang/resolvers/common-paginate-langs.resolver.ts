import { Resolver, Args, Query } from '@nestjs/graphql';
import { Constraint, IQueryBus, QueryStatement, Timezone } from 'aurora-ts-core';

// @apps
import { PaginateLangsQuery } from '../../../../@apps/common/lang/application/paginate/paginate-langs.query';
import { Pagination } from './../../../../graphql';

@Resolver()
export class CommonPaginateLangsResolver
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    @Query('commonPaginateLangs')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<Pagination>
    {
        return await this.queryBus.ask(new PaginateLangsQuery(queryStatement, constraint, { timezone }));
    }
}