import { Resolver, Args, Query } from '@nestjs/graphql';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';

// @app
import { CommonGetAdministrativeAreasLevel3Handler } from '../handlers/common-get-administrative-areas-level-3.handler';
import { CommonAdministrativeAreaLevel3 } from '@api/graphql';

@Resolver()
export class CommonGetAdministrativeAreasLevel3Resolver
{
    constructor(
        private readonly handler: CommonGetAdministrativeAreasLevel3Handler,
    ) {}

    @Query('commonGetAdministrativeAreasLevel3')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<CommonAdministrativeAreaLevel3[]>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}