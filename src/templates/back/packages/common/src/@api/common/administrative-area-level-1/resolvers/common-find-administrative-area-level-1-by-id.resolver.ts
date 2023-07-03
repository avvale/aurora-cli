import { CommonFindAdministrativeAreaLevel1ByIdHandler } from '@api/common/administrative-area-level-1';
import { CommonAdministrativeAreaLevel1 } from '@api/graphql';
import { Auth } from '@aurora/decorators';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver()
@Auth('common.administrativeAreaLevel1.get')
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