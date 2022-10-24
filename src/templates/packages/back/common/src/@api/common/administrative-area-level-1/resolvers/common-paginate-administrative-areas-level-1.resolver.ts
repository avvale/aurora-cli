import { Resolver, Args, Query } from '@nestjs/graphql';
import { QueryStatement, Timezone } from 'aurora-ts-core';

// @apps
import { CommonPaginateAdministrativeAreasLevel1Handler } from '../handlers/common-paginate-administrative-areas-level-1.handler';
import { Pagination } from 'src/graphql';

@Resolver()
export class CommonPaginateAdministrativeAreasLevel1Resolver
{
    constructor(
        private readonly handler: CommonPaginateAdministrativeAreasLevel1Handler,
    ) {}

    @Query('commonPaginateAdministrativeAreasLevel1')
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