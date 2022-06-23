import { Resolver, Args, Query } from '@nestjs/graphql';
import { QueryStatement, Timezone } from 'aurora-ts-core';

// @apps
import { CommonPaginateAdministrativeAreasLevel2Handler } from '../handlers/common-paginate-administrative-areas-level-2.handler';
import { Pagination } from '../../../../graphql';

@Resolver()
export class CommonPaginateAdministrativeAreasLevel2Resolver
{
    constructor(
        private readonly handler: CommonPaginateAdministrativeAreasLevel2Handler,
    ) {}

    @Query('commonPaginateAdministrativeAreasLevel2')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<Pagination>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}