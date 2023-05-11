import { Resolver, Args, Query } from '@nestjs/graphql';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';

// @app
import { CommonFindAdministrativeAreaLevel2Handler } from '../handlers/common-find-administrative-area-level-2.handler';
import { CommonAdministrativeAreaLevel2 } from '@api/graphql';

@Resolver()
export class CommonFindAdministrativeAreaLevel2Resolver
{
    constructor(
        private readonly handler: CommonFindAdministrativeAreaLevel2Handler,
    ) {}

    @Query('commonFindAdministrativeAreaLevel2')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<CommonAdministrativeAreaLevel2>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}