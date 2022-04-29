import { Resolver, Args, Query } from '@nestjs/graphql';
import { Constraint, IQueryBus, QueryStatement, Timezone } from 'aurora-ts-core';

// @apps
import { FindAdministrativeAreaLevel1ByIdQuery } from '../../../../@apps/common/administrative-area-level-1/application/find/find-administrative-area-level-1-by-id.query';
import { CommonAdministrativeAreaLevel1 } from './../../../../graphql';

@Resolver()
export class CommonFindAdministrativeAreaLevel1ByIdResolver
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    @Query('commonFindAdministrativeAreaLevel1ById')
    async main(
        @Args('id') id: string,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<CommonAdministrativeAreaLevel1>
    {
        return await this.queryBus.ask(new FindAdministrativeAreaLevel1ByIdQuery(id, constraint, { timezone }));
    }
}