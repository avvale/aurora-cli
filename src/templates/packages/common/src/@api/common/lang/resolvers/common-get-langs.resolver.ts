import { Resolver, Args, Query } from '@nestjs/graphql';
import { Constraint, IQueryBus, QueryStatement, Timezone } from 'aurora-ts-core';

// @apps
import { GetLangsQuery } from '../../../../@apps/common/lang/application/get/get-langs.query';
import { CommonLang } from './../../../../graphql';

@Resolver()
export class CommonGetLangsResolver
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    @Query('commonGetLangs')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<CommonLang[]>
    {
        return await this.queryBus.ask(new GetLangsQuery(queryStatement, constraint, { timezone }));
    }
}