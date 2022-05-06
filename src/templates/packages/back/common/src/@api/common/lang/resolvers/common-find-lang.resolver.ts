import { Resolver, Args, Query } from '@nestjs/graphql';
import { Constraint, IQueryBus, QueryStatement, Timezone } from 'aurora-ts-core';

// @apps
import { FindLangQuery } from '../../../../@apps/common/lang/application/find/find-lang.query';
import { CommonLang } from './../../../../graphql';

@Resolver()
export class CommonFindLangResolver
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    @Query('commonFindLang')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<CommonLang>
    {
        return await this.queryBus.ask(new FindLangQuery(queryStatement, constraint, { timezone }));
    }
}