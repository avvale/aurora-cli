import { Resolver, Args, Query } from '@nestjs/graphql';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';

// @app
import { CommonGetAdministrativeAreasLevel2Handler } from '../handlers/common-get-administrative-areas-level-2.handler';
import { CommonAdministrativeAreaLevel2 } from '@api/graphql';

@Resolver()
export class CommonGetAdministrativeAreasLevel2Resolver
{
    constructor(
        private readonly handler: CommonGetAdministrativeAreasLevel2Handler,
    ) {}

    @Query('commonGetAdministrativeAreasLevel2')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<CommonAdministrativeAreaLevel2[]>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}