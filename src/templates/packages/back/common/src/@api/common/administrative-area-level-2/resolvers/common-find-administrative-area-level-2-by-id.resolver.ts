import { Resolver, Args, Query } from '@nestjs/graphql';
import { QueryStatement, Timezone } from 'aurora-ts-core';

// @apps
import { CommonFindAdministrativeAreaLevel2ByIdHandler } from '../handlers/common-find-administrative-area-level-2-by-id.handler';
import { CommonAdministrativeAreaLevel2 } from 'src/graphql';

@Resolver()
export class CommonFindAdministrativeAreaLevel2ByIdResolver
{
    constructor(
        private readonly handler: CommonFindAdministrativeAreaLevel2ByIdHandler,
    ) {}

    @Query('commonFindAdministrativeAreaLevel2ById')
    async main(
        @Args('id') id: string,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<CommonAdministrativeAreaLevel2>
    {
        return await this.handler.main(
            id,
            constraint,
            timezone,
        );
    }
}