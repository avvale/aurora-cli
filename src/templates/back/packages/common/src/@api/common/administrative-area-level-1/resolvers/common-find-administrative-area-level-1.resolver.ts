import { Resolver, Args, Query } from '@nestjs/graphql';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';

// @app
import { CommonFindAdministrativeAreaLevel1Handler } from '../handlers/common-find-administrative-area-level-1.handler';
import { CommonAdministrativeAreaLevel1 } from '@api/graphql';

@Resolver()
export class CommonFindAdministrativeAreaLevel1Resolver
{
    constructor(
        private readonly handler: CommonFindAdministrativeAreaLevel1Handler,
    ) {}

    @Query('commonFindAdministrativeAreaLevel1')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<CommonAdministrativeAreaLevel1>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}