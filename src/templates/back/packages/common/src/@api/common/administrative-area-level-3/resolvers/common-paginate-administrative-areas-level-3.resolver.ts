import { Resolver, Args, Query } from '@nestjs/graphql';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Auth } from '@aurora/decorators';

// @app
import { CommonPaginateAdministrativeAreasLevel3Handler } from '../handlers/common-paginate-administrative-areas-level-3.handler';
import { Pagination } from '@api/graphql';

@Resolver()
@Auth('common.administrativeAreaLevel3.get')
export class CommonPaginateAdministrativeAreasLevel3Resolver
{
    constructor(
        private readonly handler: CommonPaginateAdministrativeAreasLevel3Handler,
    ) {}

    @Query('commonPaginateAdministrativeAreasLevel3')
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