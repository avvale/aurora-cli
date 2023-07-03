import { Resolver, Args, Query } from '@nestjs/graphql';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Auth } from '@aurora/decorators';

// @app
import { CommonFindAdministrativeAreaLevel3Handler } from '../handlers/common-find-administrative-area-level-3.handler';
import { CommonAdministrativeAreaLevel3 } from '@api/graphql';

@Resolver()
@Auth('common.administrativeAreaLevel3.get')
export class CommonFindAdministrativeAreaLevel3Resolver
{
    constructor(
        private readonly handler: CommonFindAdministrativeAreaLevel3Handler,
    ) {}

    @Query('commonFindAdministrativeAreaLevel3')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<CommonAdministrativeAreaLevel3>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}