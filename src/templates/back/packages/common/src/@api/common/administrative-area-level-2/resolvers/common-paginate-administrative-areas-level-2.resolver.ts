import { Resolver, Args, Query } from '@nestjs/graphql';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';

// @app
import { CommonPaginateAdministrativeAreasLevel2Handler } from '../handlers/common-paginate-administrative-areas-level-2.handler';
import { Pagination } from '@api/graphql';

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