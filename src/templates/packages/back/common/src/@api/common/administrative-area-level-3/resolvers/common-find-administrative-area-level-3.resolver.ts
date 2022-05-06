import { Resolver, Args, Query } from '@nestjs/graphql';
import { Constraint, IQueryBus, QueryStatement, Timezone } from 'aurora-ts-core';

// @apps
import { FindAdministrativeAreaLevel3Query } from '../../../../@apps/common/administrative-area-level-3/application/find/find-administrative-area-level-3.query';
import { CommonAdministrativeAreaLevel3 } from './../../../../graphql';

@Resolver()
export class CommonFindAdministrativeAreaLevel3Resolver
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    @Query('commonFindAdministrativeAreaLevel3')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<CommonAdministrativeAreaLevel3>
    {
        return await this.queryBus.ask(new FindAdministrativeAreaLevel3Query(queryStatement, constraint, { timezone }));
    }
}