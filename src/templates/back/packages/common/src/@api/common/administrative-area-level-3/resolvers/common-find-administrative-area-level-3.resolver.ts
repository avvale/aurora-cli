import { CommonFindAdministrativeAreaLevel3Handler } from '@api/common/administrative-area-level-3';
import { CommonAdministrativeAreaLevel3 } from '@api/graphql';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

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
