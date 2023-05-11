import { Resolver, Args, Query } from '@nestjs/graphql';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';

// @app
import { CommonFindAdministrativeAreaLevel3ByIdHandler } from '../handlers/common-find-administrative-area-level-3-by-id.handler';
import { CommonAdministrativeAreaLevel3 } from '@api/graphql';

@Resolver()
export class CommonFindAdministrativeAreaLevel3ByIdResolver
{
    constructor(
        private readonly handler: CommonFindAdministrativeAreaLevel3ByIdHandler,
    ) {}

    @Query('commonFindAdministrativeAreaLevel3ById')
    async main(
        @Args('id') id: string,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<CommonAdministrativeAreaLevel3>
    {
        return await this.handler.main(
            id,
            constraint,
            timezone,
        );
    }
}