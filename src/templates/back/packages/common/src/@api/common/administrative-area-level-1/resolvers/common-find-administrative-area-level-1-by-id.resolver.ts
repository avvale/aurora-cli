import { Resolver, Args, Query } from '@nestjs/graphql';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';

// @app
import { CommonFindAdministrativeAreaLevel1ByIdHandler } from '../handlers/common-find-administrative-area-level-1-by-id.handler';
import { CommonAdministrativeAreaLevel1 } from '@api/graphql';

@Resolver()
export class CommonFindAdministrativeAreaLevel1ByIdResolver
{
    constructor(
        private readonly handler: CommonFindAdministrativeAreaLevel1ByIdHandler,
    ) {}

    @Query('commonFindAdministrativeAreaLevel1ById')
    async main(
        @Args('id') id: string,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<CommonAdministrativeAreaLevel1>
    {
        return await this.handler.main(
            id,
            constraint,
            timezone,
        );
    }
}