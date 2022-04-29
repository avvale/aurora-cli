import { Resolver, Args, Query } from '@nestjs/graphql';
import { Constraint, IQueryBus, QueryStatement, Timezone } from 'aurora-ts-core';

// @apps
import { FindAdministrativeAreaLevel2Query } from '../../../../@apps/common/administrative-area-level-2/application/find/find-administrative-area-level-2.query';
import { CommonAdministrativeAreaLevel2 } from './../../../../graphql';

@Resolver()
export class CommonFindAdministrativeAreaLevel2Resolver
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    @Query('commonFindAdministrativeAreaLevel2')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<CommonAdministrativeAreaLevel2>
    {
        return await this.queryBus.ask(new FindAdministrativeAreaLevel2Query(queryStatement, constraint, { timezone }));
    }
}