import { Resolver, Args, Query } from '@nestjs/graphql';
import { Constraint, IQueryBus, QueryStatement, Timezone } from 'aurora-ts-core';

// @apps
import { GetAdministrativeAreasLevel2Query } from '../../../../@apps/common/administrative-area-level-2/application/get/get-administrative-areas-level-2.query';
import { CommonAdministrativeAreaLevel2 } from './../../../../graphql';

@Resolver()
export class CommonGetAdministrativeAreasLevel2Resolver
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    @Query('commonGetAdministrativeAreasLevel2')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<CommonAdministrativeAreaLevel2[]>
    {
        return await this.queryBus.ask(new GetAdministrativeAreasLevel2Query(queryStatement, constraint, { timezone }));
    }
}